import { REFRESH_TOKEN_EXPIRY_MS } from '@/conf/constants'
import { connectToDB } from '@/db/dbConnector'
import { createAccessToken, createRefreshToken, hashToken } from '@/lib/tokens/hash.token'
import Session from '@/models/session.model'
import User from '@/models/user.model'
import { OAuth2Client } from 'google-auth-library'

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID!)

type GoogleAuthResult =
    | { ok: false, message: string }
    | { ok: true, accessToken: string, refreshToken: string }

type GoogleAuthArgs = {
    userAgent: string
    ip: string
    code: string
}

export const googleAuthService = async ({
    userAgent,
    ip,
    code
}: GoogleAuthArgs): Promise<GoogleAuthResult> => {
    try {
        if (!code) {
            return {
                ok: false,
                message: 'Google code missing.'
            }
        }

        const tokenRes = await fetch(
            'https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                client_id: process.env.GOOGLE_CLIENT_ID!,
                client_secret: process.env.GOOGLE_CLIENT_SECRET!,
                redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
                grant_type: 'authorization_code',
                code
            })
        })

        if (!tokenRes.ok) {
            return {
                ok: false,
                message: 'Failed to get tokens from google.'
            }
        }

        const { id_token: idToken } = await tokenRes.json()

        if (!idToken) {
            return {
                ok: false,
                message: 'No id_token returened by google.'
            }
        }

        const ticket = await googleClient.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID!
        })

        const { email, name, sub: googleId } = ticket.getPayload()

        if (!email || !name || !googleId) {
            return {
                ok: false,
                message: 'Invalid google token payload.'
            }
        }

        await connectToDB()

        const existing = await User.findOne({ email })

        if (existing && existing.authProvider === 'CREDENTIALS') {
            return {
                ok: false,
                message: 'This email is registered using password login.'
            }
        }

        let user = existing

        if (!user) {
            user = await User.create({
                name,
                email,
                emailVerifiedAt: new Date(),
                authProvider: 'GOOGLE',
                providerId: googleId,
                roles: ['USER']
            })
        }

        const refreshToken = createRefreshToken()

        const session = await Session.create({
            userId: user._id,
            refreshTokenHash: hashToken(refreshToken),
            userAgent,
            ip,
            expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRY_MS)
        })

        const accessToken = createAccessToken({
            sub: user._id,
            sid: session._id
        })

        return {
            ok: true,
            accessToken,
            refreshToken
        }
    } catch (err: unknown) {
        // console.log('Google OAuth Handshake error:', err)
        return {
            ok: false,
            message: 'Internal server error.'
        }
    }
}