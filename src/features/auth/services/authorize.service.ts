import conf from "@/conf/conf"
import { connectToDB } from "@/db/dbConnector"
import { AuthPayload } from "@/lib/auth/requireAuth"
import User from "@/models/user.model"
import { RoleType } from "@/store/auth/authSlice"
import jwt from 'jsonwebtoken'

export type AuthorizeErrorType = 'UNAUTHORIZED'

type AuthorizeResult =
    | { ok: false, code: AuthorizeErrorType }
    | { ok: true, roles: RoleType[], emailVerified: boolean, name: string | null }

type AuthorizeArgs = {
    token: string
}

export const authorizeService = async ({
    token
}: AuthorizeArgs): Promise<AuthorizeResult> => {
    if (!token) {
        return {
            ok: false,
            code: 'UNAUTHORIZED'
        }
    }

    await connectToDB()

    let decoded: AuthPayload

    try {
        decoded = jwt.verify(token, conf.jwtSecret) as AuthPayload
    } catch (err: any) {
        return {
            ok: false,
            code: 'UNAUTHORIZED'
        }
    }

    if (!decoded.sub) {
        return {
            ok: false,
            code: 'UNAUTHORIZED'
        }
    }

    const user = await User.findById(decoded.sub)
        .select('emailVerifiedAt roles name')
        .lean()

    if (!user) {
        return {
            ok: false,
            code: 'UNAUTHORIZED'
        }
    }

    return {
        ok: true,
        roles: user.roles,
        emailVerified: Boolean(user.emailVerifiedAt),
        name: user.name ?? null
    }
}