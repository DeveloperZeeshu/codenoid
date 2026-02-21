import { createAsyncThunk } from "@reduxjs/toolkit";
import { RoleType } from "./authSlice";
import { authorizeUser } from "@/features/auth/apis/auth.api";

export type AuthorizePayload = {
    roles: RoleType[]
    emailVerified: boolean
    name: string
}

export const authorize = createAsyncThunk<
    AuthorizePayload
>(
    'auth/authorize',
    async () => {
        const res = await authorizeUser()
        return {
            roles: res.roles,
            emailVerified: res.emailVerified,
            name: res.name
        }
    }
)
