import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import styled from "styled-components"

const AppLayout = () => {
    return (
        <Wrapper>
            <Sidebar />
            <Outlet />
        </Wrapper>
    )
}

export default AppLayout

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100dvh;

    /* Mobile */
    @media (max-width: 768px) {
        flex-direction: column;
        height: auto;
        min-height: 100dvh;
    }
`