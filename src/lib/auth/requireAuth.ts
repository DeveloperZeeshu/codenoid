'use server'
import 'server-only'

import { JwtPayload } from 'jsonwebtoken'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import conf from '@/conf/conf'

export type AuthPayload = JwtPayload & {
    sub: string
    sid: string
}

type RequireAuthResult = {
    authPayload: AuthPayload | null
    success: boolean
}

export const requireAuth = async (

): Promise<RequireAuthResult> => {
    const token = (await cookies()).get('access_token')?.value
    if (!token) {
        return {
            authPayload: null,
            success: false
        }
    }

    try {
        const decoded = jwt.verify(token, conf.jwtSecret) as AuthPayload
        return {
            authPayload: decoded,
            success: true
        }
    } catch (err) {
        // console.log('Auth verification error.', err)
        return {
            authPayload: null,
            success: false
        }
    }
}
