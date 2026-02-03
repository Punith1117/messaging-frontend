import { Outlet } from "react-router-dom"
import AppDetails from "../components/AppDetails"
import styled from "styled-components"

const AuthLayout = () => {
    return (
        <Wrapper>
            <AppDetails />
            <Outlet />
        </Wrapper>
    )
}

export default AuthLayout

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;

    // Mobile
    @media (max-width: 768px) {
        flex-direction: column-reverse;
    }
`