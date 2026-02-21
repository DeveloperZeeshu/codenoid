import { connectToDB } from "@/db/dbConnector"
import { createAccessToken, createRefreshToken, hashToken } from "@/lib/tokens/hash.token"
import Session from "@/models/session.model"
import { Types } from "mongoose"

export type RefreshTokensErrorType = 'UNAUTHORIZED'

type RefreshTokensResult =
    | { ok: true, newRefreshToken: string, newAccessToken: string }
    | { ok: false, code: 'UNAUTHORIZED' }

export const refreshTokensService = async ({
    refreshToken
}: {
    refreshToken: string
}): Promise<RefreshTokensResult> => {
    if (!refreshToken) {
        return {
            ok: false,
            code: 'UNAUTHORIZED'
        }
    }

    await connectToDB()

    const newRefreshToken = createRefreshToken()
    const oldHash = hashToken(refreshToken)
    const newHash = hashToken(newRefreshToken)

    const updatedSession = await Session.findOneAndUpdate(
        {
            refreshTokenHash: oldHash,
            expiresAt: { $gt: new Date() },
            active: true
        },
        { refreshTokenHash: newHash },
        { new: true }
    )

    if (!updatedSession) {
        return {
            ok: false,
            code: 'UNAUTHORIZED'
        }
    }

    const newAccessToken = createAccessToken({
        sid: updatedSession._id,
        sub: updatedSession.userId as unknown as Types.ObjectId
    })

    return {
        ok: true,
        newRefreshToken,
        newAccessToken
    }
}