import { Outlet } from "react-router-dom"
import AppDetails from "../components/AppDetails"

const AuthLayout = () => {
    return (
        <div>
            <AppDetails />
            <Outlet />
        </div>
    )
}

export default AuthLayout