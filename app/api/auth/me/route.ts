import { AuthorizeErrorType, authorizeService } from "@/features/auth/services/authorize.service";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const AUTH_ERROR_MAP: Record<AuthorizeErrorType, {
    message: string
    status: number
}> = {
    UNAUTHORIZED: { message: 'Unauthorized.', status: 401 }
}

export const GET = async (req: NextRequest) => {
    try {
        const token = (await cookies()).get('access_token')?.value

        const result = await authorizeService({ token })

        if (result.ok === false) {
            const err = AUTH_ERROR_MAP[result.code]
            if (!err) {
                // console.log('Unhandled AuthErrorType:',result.code)

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

        return NextResponse.json({
            ok: true,
            message: 'Authorized.',
            roles: result.roles,
            emailVerified: result.emailVerified,
            name: result.name
        })
    } catch (err: unknown) {
        // console.log('Authorize Error:',err)
        return NextResponse.json({
            ok: false,
            message: 'Internal server error.'
        }, { status: 500 })
    }
}