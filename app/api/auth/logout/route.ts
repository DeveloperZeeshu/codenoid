import { LogoutErrorType, logoutService } from "@/features/auth/services/logout.service"
import { AuthPayload, requireAuth } from "@/lib/auth/requireAuth"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

const LOGOUT_ERROR_MAP: Record<LogoutErrorType, {
    status: number
    message: string
}> = {
    UNAUTHORIZED: { status: 401, message: 'Unauthorized.' },
}

export const POST = async (req: NextRequest) => {
    try {
        const { authPayload, success } = await requireAuth()

        if (!success) {
            return NextResponse.json({
                ok: false,
                message: 'Unauthorized.'
            }, { status: 401 })
        }

        const { sub, sid } = authPayload as AuthPayload

        const result = await logoutService({ sub, sid })

        if (result.ok === false) {
            const err = LOGOUT_ERROR_MAP[result.code]

            if (!err) {
                // console.error('Unhandled LogoutErrorType: ',result.code)
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

        const cookieStore = await cookies()

        cookieStore.delete({
            name: 'access_token',
            path: '/'
        })
        cookieStore.delete({
            name: 'refresh_token',
            path: '/'
        })

        return NextResponse.json({
            ok: true,
            message: 'Logout successfully.'
        }, { status: 200 })
    } catch (err: unknown) {
        // console.error('Logout Error:',err)
        return NextResponse.json({
            ok: false,
            message: 'Internal server error.'
        }, { status: 500 })
    }
}