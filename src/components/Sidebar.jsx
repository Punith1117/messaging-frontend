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

    @media (max-width: 1200px) {
        width: 40%;
    }
`