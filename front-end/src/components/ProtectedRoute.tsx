import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "../types/storeType"

const ProtectedRoute = () => {
    const {userInfo} = useAppSelector(state => state.auth)
    return userInfo ? <Outlet /> : <Navigate to="/" replace />
}

export default ProtectedRoute