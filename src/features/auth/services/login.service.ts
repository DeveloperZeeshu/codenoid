import { REFRESH_TOKEN_EXPIRY_MS } from "@/conf/constants"
import { connectToDB } from "@/db/dbConnector"
import { createAccessToken, createRefreshToken, hashToken } from "@/lib/tokens/hash.token"
import Session from "@/models/session.model"
import User from "@/models/user.model"
import argon2 from 'argon2'

export type LoginErrorType = 'MISSING_FIELDS' | 'BAD_REQUEST' | 'INVALID_CREDENTIALS'

export type LoginResult =
    | { ok: false, code: LoginErrorType }
    | { ok: true, accessToken: string, refreshToken: string }

type LoginArgs = {
    email: string
    password: string
    userAgent: string
    ip: string
}

export const loginService = async ({
    email,
    password,
    userAgent,
    ip
}: LoginArgs): Promise<LoginResult> => {
    if (!email || !password) {
        return {
            ok: false,
            code: 'MISSING_FIELDS'
        }
    }

    await connectToDB()

    const existingUser = await User.findOne({ email })
    if (!existingUser) {
        return {
            ok: false,
            code: 'INVALID_CREDENTIALS'
        }
    }

    if (existingUser.authProvider === 'GOOGLE') {
        return {
            ok: false,
            code: 'BAD_REQUEST'
        }
    }

    const passwordValid = await argon2.verify(existingUser.passwordHash, password)
    if (!passwordValid) {
        return {
            ok: false,
            code: 'INVALID_CREDENTIALS'
        }
    }

    const refreshToken = createRefreshToken()
    const refreshTokenHash = hashToken(refreshToken)

    const session = await Session.create({
        userId: existingUser._id,
        userAgent,
        ip,
        refreshTokenHash,
        expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRY_MS)
    })

    const accessToken = createAccessToken({
        sub: existingUser._id,
        sid: session._id
    })

    return {
        ok: true,
        accessToken,
        refreshToken
    }
}