import { ACCESS_TOKEN_EXPIRY_MS, MILLISECONDS_PER_SECOND, REFRESH_TOKEN_EXPIRY_MS } from "@/conf/constants";
import { cookieConfig } from "@/conf/cookieConfig";
import { googleAuthService } from "@/features/auth/services/google_auth.service";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const userAgent = req.headers.get('user-agent') ?? 'unknown'
        const forwardedFor = req.headers.get('x-forwarded-for')
        const ip = forwardedFor?.split(',')[0].trim() ?? 'unknown'

        const result = await googleAuthService({
            userAgent,
            ip,
            code: req.nextUrl.searchParams.get('code')!
        })

        if (result.ok === false) {
            // console.log('message',result.message)
            return NextResponse.redirect(
                new URL('/auth/login', req.url)
            )
        }

        const cookieStore = await cookies()

        cookieStore.set('access_token', result.accessToken, {
            ...cookieConfig,
            path: '/',
            maxAge: ACCESS_TOKEN_EXPIRY_MS / MILLISECONDS_PER_SECOND
        })

        cookieStore.set('refresh_token', result.refreshToken, {
            ...cookieConfig,
            path: '/',
            maxAge: REFRESH_TOKEN_EXPIRY_MS / MILLISECONDS_PER_SECOND
        })

        return NextResponse.redirect(
            new URL('/', req.url)
        )
    } catch (err: unknown) {
        // console.log('Google OAuth Error:',err)
        return NextResponse.redirect(
            new URL('/auth/login', req.url)
        )
    }
}