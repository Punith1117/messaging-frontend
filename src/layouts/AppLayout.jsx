import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"

const AppLayout = () => {
    return (
        <div>
            <Sidebar />
            <Outlet />
        </div>
    )
}

export default AppLayout