import { connectToDB } from "@/db/dbConnector"
import Session from "@/models/session.model"

export type LogoutErrorType =
    'UNAUTHORIZED'

type LogoutResult =
    | { ok: false, code: LogoutErrorType }
    | { ok: true }

export const logoutService = async ({
    sub,
    sid
}: {
    sub: string
    sid: string
}): Promise<LogoutResult> => {
    if (!sub || !sid) {
        return {
            ok: false,
            code: 'UNAUTHORIZED'
        }
    }

    await connectToDB()

    const deletedSession = await Session.findOneAndDelete({
        _id: sid,
        userId: sub
    })

    if (!deletedSession) {
        return {
            ok: false,
            code: 'UNAUTHORIZED'
        }
    }

    return {
        ok: true
    }
}