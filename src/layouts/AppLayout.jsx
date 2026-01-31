import { Outlet } from "react-router-dom"

const AppLayout = () => {
    return (
        <div>
            {/* Sidebar goes here later*/}
            <Outlet />
        </div>
    )
}

export default AppLayout