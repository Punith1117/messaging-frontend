import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getAllChats } from "../api/chatQueries"
import styled from "styled-components"

const ChatList = () => {
    const [chats, setChats] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const fetchChats = async () => {
        let res = await getAllChats();
        setLoading(false)
        if (res === 401) {
            navigate('/login', {replace: true})
            return
        }
        setChats(res)
    }
    
    useEffect(() => {
        fetchChats()
    }, [navigate])

    if (loading) return <Wrapper>loading...</Wrapper>
    else if (chats.length === 0) {
        return (
            <Wrapper>
                <NoChats>
                    <p>No chat found</p>
                    <p>Search for new users and start a chat</p>
                </NoChats>
            </Wrapper>
        )
    } else return (
        <Wrapper>
            {chats.map(item => ( 
                <ChatListItem
                    key={item.user.id} 
                    id={item.user.id} 
                    username={item.user.username}
                    casualName={item.user.casualName}
                    status={item.status} 
                />
            ))}
        </Wrapper>
    )
}

const ChatListItem = ({id, username, casualName, status}) => {
    const { userId } = useParams()

    return (
        <Item to={`/chat/${id}`} className={(userId == id) ? 'selected' : ''}>
            <div className="user-info">
                <p className="username">{username}</p>
                {casualName && <p className="casualName">{casualName}</p>}
            </div>
            {status !== 'accepted' && (
                <p className={`status ${status}`}>{status}</p>
            )}
        </Item>
    )
}

export default ChatList

const Wrapper = styled.div`
    width: 100%;
    height: 80%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 15px;

    .selected {
        background-color: #76f05e57;
    }
`

const NoChats = styled.div`
    width: 100%;
    background-color: #fff;
    color: #a3a3a3;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
    font-weight: 600;

    p {
        margin: 0;
    }
`

const Item = styled(Link)`
    height: 4rem;
    width: 100%;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    text-decoration: none;
    color: black;

    p {
        margin: 0;
    }

    .user-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        
    }

    .username {
        font-weight: 500;
        font-size: large;
    }

    .casualName {
        color: #555;
        font-size: 14px;
    }
    
    .status {
        font-weight: 400;
        align-self: flex-start;
    }

    .status.blocked {
        color: white;
        background-color: #EC221F;
        border-radius: 14px;
        padding: 5px;
        font-size: 12px;
    }

    .status.pending {
        color: #DD6B20;
        background-color: #FEEBC8;
        border-radius: 14px;
        padding: 5px;
        font-size: 12px;
    }
    
    &:hover {
        filter: brightness(0.9);
    }
`
