import conf from '@/conf/conf'
import { ACCESS_TOKEN_EXPIRY_MS, MILLISECONDS_PER_SECOND } from '@/conf/constants'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'

// Creating and hashing tokens
export const createRefreshToken = (): string => {
    return crypto.randomBytes(64).toString('hex')
}

export const hashToken = (token: string): string => {
    return crypto.createHash('sha256').update(token).digest('hex')
}


//Access Token
export const createAccessToken = ({
    sub,
    sid
}: {
    sub: Types.ObjectId
    sid: Types.ObjectId
}): string => {
    return jwt.sign({
        sub,
        sid
    }, conf.jwtSecret, {
        expiresIn: ACCESS_TOKEN_EXPIRY_MS / MILLISECONDS_PER_SECOND
    })
}