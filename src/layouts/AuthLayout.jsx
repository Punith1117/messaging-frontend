import { Outlet } from "react-router-dom"
import AppDetails from "../components/AppDetails"

const AuthLayout = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw'
        }}>
            <AppDetails />
            <Outlet />
        </div>
    )
}

export default AuthLayout