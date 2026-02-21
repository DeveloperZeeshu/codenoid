import { handleAxiosError } from "@/axios/handleAxiosError"
import { logoutUser } from "@/features/auth/apis/auth.api"
import { useState } from "react"
import toast from "react-hot-toast"

export const useLogout = () => {
    const [loading, setLoading] = useState<boolean>(false)

    const mutate = async () => {
        setLoading(true)
        try {
            await logoutUser()
            toast.success('Logout successfully')
            window.location.href = '/'
        } catch (err) {
            handleAxiosError(err)
        } finally {
            setLoading(false)
        }
    }

    return {
        loading,
        mutate
    }
}