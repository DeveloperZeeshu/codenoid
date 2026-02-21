import { RegisterErrorType, registerService } from "@/features/auth/services/register.service";
import { registerSchema } from "@/validations/auth/register.schema";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const REGISTER_ERROR_MAP: Record<RegisterErrorType, {
    status: number
    message: string
}> = {
    MISSING_FIELDS: { status: 400, message: 'Missing email or password.' },
    USER_EXISTS: { status: 409, message: 'User already exists.' }
}

export const POST = async (req: NextRequest) => {
    try {
        const untrustedData = await req.json()
        const parsedData = registerSchema.safeParse(untrustedData)

        if (!parsedData.success) {
            const error = z.treeifyError(parsedData.error)

            return NextResponse.json({
                ok: false,
                message: 'Invalid requested data.',
                errors: error
            }, { status: 422 })
        }

        const { email, password, name } = parsedData.data

        const result = await registerService({
            email,
            password,
            name
        })

        if (result.ok === false) {
            const err = REGISTER_ERROR_MAP[result.code]

            if (!err) {
                // console.log('Unhandled RegisterErrorCode: ', result.code)

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
            message: 'Registration Successful.'
        }, { status: 201 })
    } catch (err: unknown) {
        // console.log('Registration error:', err)
        return NextResponse.json({
            ok: false,
            message: 'Internal server error.'
        }, { status: 500 })
    }
}