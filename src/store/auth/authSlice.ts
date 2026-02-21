import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { authorize, AuthorizePayload } from "./authThunks"

export type StatusType =
    | 'loading'
    | 'authenticated'
    | 'unauthenticated'

export type RoleType =
    | 'USER'
    | 'ADMIN'

type AuthState = {
    status: StatusType
    emailVerified: boolean
    roles: RoleType[]
    name: string | null
    error: string | null
}

const initialState: AuthState = {
    status: 'unauthenticated',
    emailVerified: false,
    name: null,
    roles: [],
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        clearAuth: (state) => {
            state.emailVerified = false
            state.error = null
            state.roles = []
            state.name = null
            state.status = 'unauthenticated'
        },
        setEmailStatus: (state, action: PayloadAction<boolean>) => {
            state.emailVerified = action.payload
        }
    },

    extraReducers: (builder) => {
        builder.
            addCase(authorize.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })

            .addCase(authorize.fulfilled, (state, action: PayloadAction<AuthorizePayload>) => {
                state.error = null
                state.status = 'authenticated'
                state.roles = action.payload.roles
                state.name = action.payload.name
                state.emailVerified = action.payload.emailVerified
            })

            .addCase(authorize.rejected, (state, action) => {
                state.emailVerified = false
                state.roles = []
                state.status = 'unauthenticated'
                state.name = null
                state.error = action.error.message ?? 'Authentication Failed.'
            })
    }
})

export const selectIsAuth = (state: { auth: AuthState }) =>
    state.auth.status === 'authenticated'

export const selectAuthLoading = (state: { auth: AuthState }) =>
    state.auth.status === 'loading'

export const selectAuthError = (state: { auth: AuthState }) =>
    state.auth.error

export const selectAuthRoles = (state: { auth: AuthState }) =>
    state.auth.roles

export const selectName = (state: { auth: AuthState }) =>
    state.auth.name

export const selectEmailStatus = (state: { auth: AuthState }) =>
    state.auth.emailVerified


export const {
    clearAuth,
    setEmailStatus
} = authSlice.actions

export default authSlice.reducer
