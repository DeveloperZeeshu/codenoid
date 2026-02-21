import apiClient from "@/axios/apiClient"

// Authorize Api
export const authorizeUser = async () => {
    const res = await apiClient.get('/auth/me')
    return res.data
}


// Login Api
type LoginPayload = {
    email: string
    password: string
}

export const loginUser = async (
    payload: LoginPayload
) => {
    const res = await apiClient.post('/auth/login', payload)
    return res.data
}


// Register Api
type RegisterPayLoad = {
    name: string
    email: string
    password: string
}

export const registerUser = async (
    payload: RegisterPayLoad
) => {
    const res = await apiClient.post('/auth/register', payload)
    return res.data
}


// Logout Api
export const logoutUser = async () => {
    const res = await apiClient.post('/auth/logout', {})
    return res.data
}