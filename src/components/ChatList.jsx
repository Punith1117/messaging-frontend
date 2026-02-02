import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAllChats } from "../api/chatQueries"

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

    if (loading) return <div>loading...</div>
    else if (chats.length === 0) {
        return (
            <div>
                <p>No chat found</p>
                <p>Search for new users and start a chat</p>
            </div>
        )
    } else return (
        <div>
            {
                chats.map(item => ( 
                    <ChatListItem
                        key={item.id} 
                        id={item.user.id} 
                        username={item.user.username}
                        casualName={item.user.casualName}
                        status={item.status} 
                />))
            }
        </div>
    )
}

const ChatListItem = ({id, username, casualName, status}) => {
    return (
        <Link to={`/chat/${id}`}>
            <p>{username}</p>
            {casualName && <p>{casualName}</p>}
            {(status !== 'accepted') && <p>{status}</p>}
        </Link>
    )
}

export default ChatList