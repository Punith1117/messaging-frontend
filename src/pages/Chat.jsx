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
`