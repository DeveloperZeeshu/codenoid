import { useSelector } from "react-redux"
import { selectAuthError, selectAuthLoading, selectAuthRoles, selectIsAuth, selectName } from "./authSlice"

export const useAuth = () => {
    const loading = useSelector(selectAuthLoading)
    const error = useSelector(selectAuthError)
    const roles = useSelector(selectAuthRoles)
    const isAuth = useSelector(selectIsAuth)
    const name = useSelector(selectName)

    return {
        loading,
        error,
        roles,
        isAuth,
        name
    }
}