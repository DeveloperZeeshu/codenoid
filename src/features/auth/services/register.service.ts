import { connectToDB } from "@/db/dbConnector"
import User from "@/models/user.model"
import argon2 from 'argon2'

export type RegisterErrorType =
    'USER_EXISTS' | 'MISSING_FIELDS'

type RegisterResult =
    | { ok: false, code: RegisterErrorType }
    | { ok: true }

type RegisterArgs = {
    email: string
    name: string
    password: string
}

export const registerService = async ({
    email,
    name,
    password
}: RegisterArgs): Promise<RegisterResult> => {
    if (!email || !password) {
        return {
            ok: false,
            code: 'MISSING_FIELDS'
        }
    }

    await connectToDB()

    const passwordHash = await argon2.hash(password)

    try {
        const user = await User.create({
            name,
            email,
            passwordHash,
            roles: ['USER'],
            authProvider: 'CREDENTIALS',
            isActive: true
        })
    } catch (err: any) {
        if (err.code === 11000) {
            return {
                ok: false,
                code: 'USER_EXISTS'
            }
        }
        throw err
    }

    return {
        ok: true
    }
}