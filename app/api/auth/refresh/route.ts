import { ACCESS_TOKEN_EXPIRY_MS, MILLISECONDS_PER_SECOND, REFRESH_TOKEN_EXPIRY_MS } from "@/conf/constants";
import { cookieConfig } from "@/conf/cookieConfig";
import { RefreshTokensErrorType, refreshTokensService } from "@/features/auth/services/refresh_tokens.service";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const REFRESH_ERROR_MAP: Record<RefreshTokensErrorType, {
    message: string
    status: number
}> = {
    UNAUTHORIZED: { message: 'Unauthorized.', status: 401 }
}

export const POST = async (req: NextRequest) => {
    try {
        const cookieStore = await cookies()

        const token = cookieStore.get('refresh_token')?.value

        const result = await refreshTokensService({ refreshToken: token })

        if (result.ok === false) {
            cookieStore.delete('refresh_token')
            cookieStore.delete('access_token')

            const err = REFRESH_ERROR_MAP[result.code]
            if (!err) {
                // console.log('Unhandled RefreshTokensErrorType:',result.code)

                return NextResponse.json({
                    ok: false,
                    message: 'Internal server error.'
                }, { status: 500 })
            }
            return NextResponse.json({
                ok: false,
                message: err.message
            }, { status: err.status })
        }

        cookieStore.set('refresh_token', result.newRefreshToken, {
            ...cookieConfig,
            path: '/',
            maxAge: REFRESH_TOKEN_EXPIRY_MS / MILLISECONDS_PER_SECOND
        })

        cookieStore.set('access_token', result.newAccessToken, {
            ...cookieConfig,
            path: '/',
            maxAge: ACCESS_TOKEN_EXPIRY_MS / MILLISECONDS_PER_SECOND
        })

        return NextResponse.json({
            ok: true
        }, { status: 200 })
    } catch (err: unknown) {
        // console.log('Refresh Tokens Error:',err)

        cookieStore.delete('refresh_token')
        cookieStore.delete('access_token')

        return NextResponse.json({
            ok: false,
            message: 'Internal server error.'
        }, { status: 500 })
    }
}