import { Navigate, Outlet } from "react-router-dom"
import { isTokenExpiredOrInvalid } from "../utils"

const ProtectedLayout = () => {
    if (isTokenExpiredOrInvalid()) {
        return <Navigate to="/login" replace />
    }
    
    return (
        <Outlet />
    )
}

export default ProtectedLayout