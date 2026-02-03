import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"

const AppLayout = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100dvh'
        }}>
            <Sidebar />
            <Outlet />
        </div>
    )
}

export default AppLayout