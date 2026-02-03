import styled from "styled-components"
import ChatList from "./ChatList"
import Header from "./Header"
import Searchbar from "./Searchbar"

const Sidebar = () => {
    return (
        <Wrapper>
            <Header />
            <Searchbar />
            <ChatList />
        </Wrapper>
    )
}

export default Sidebar

const Wrapper = styled.div`
    height: 100%;
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 999;

    @media (max-width: 1200px) {
        width: 40%;
    }

    @media (max-width: 768px) {
        width: 100%;
        height: auto;
        min-height: 35vh;
    }
`