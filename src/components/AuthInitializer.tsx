import { useAppDispatch } from "@/hooks/redux-hook"
import { authorize } from "@/store/auth/authThunks"
import { useEffect } from "react"

export const AuthInitializer = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(authorize())
    }, [dispatch])
    return null
}
