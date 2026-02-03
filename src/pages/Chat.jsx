import styled from "styled-components"
import MessageBox from "../components/MessageBox"
import UserDetails from "../components/UserDetails"

const Chat = () => {
    return (
        <Wrapper>
            <UserDetails />
            <MessageBox />
        </Wrapper>
    )
}

export default Chat

const Wrapper = styled.div`
    width: 50%;
    height: 100%;
    border-left: 1px solid #cacaca;

    @media (max-width: 1200px) {
        width: 60%;
    }

    @media (max-width: 768px) {
        width: 100%;
        height: auto;
        min-height: 65vh;
        border-left: none;
        border-top: 2px solid #000000;
    }
`