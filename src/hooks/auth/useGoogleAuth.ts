import apiClient from "@/axios/apiClient";
import { useState } from "react";
import toast from "react-hot-toast";

export const useGoogleAuth = () => {
    const [loading, setLoading] = useState<boolean>(false)

    const handleAuth = async () => {
        setLoading(true)
        try {
            const res = await apiClient.get('/auth/google')

            if (res.data.url) {
                window.location.href = res.data.url;
            }
        } catch (err: any) {
            const serverMessage = err.response?.data?.message;

            toast.error(serverMessage || 'Too many requests. Please try again later.')
        } finally {
            setLoading(false)
        }
    }

    return {
        loading,
        handleAuth
    }
}