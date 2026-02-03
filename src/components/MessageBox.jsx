import { useEffect, useRef, useState } from "react"
import Messages from "./Messages"
import SendMessage from "./SendMessage"
import { useNavigate, useParams } from "react-router-dom"
import { getUserIdFromToken, isTokenExpiredOrInvalid } from "../utils"
import { getMessages, sendMessage, setStatus } from "../api/chatQueries"
import styled from "styled-components"

const MessageBox = () => {
    const [messages, setMessages] = useState(null)
    const [loggedInUserId, setLoggedInUserId] = useState(null)
    const [loading, setLoading] = useState(false)

    const messagesRef = useRef(null)
    const navigate = useNavigate()
    const { userId: otherUserId } = useParams()

    useEffect(() => {
        try {
            const id = getUserIdFromToken()
            if (!id) {
                navigate('/login', { replace: true })
                return
            }
            setLoggedInUserId(id)
        } catch {
            navigate('/login', { replace: true })
        }
    }, [navigate])

    const fetchLatestData = async () => {
        if (isTokenExpiredOrInvalid()) {
            navigate('/login', { replace: true })
            return
        }

        setLoading(true)
        const res = await getMessages(otherUserId)

        if (res?.status === 401) {
            navigate('/login', { replace: true })
            return
        }

        if (res?.status === 404) {
            setMessages({ chatStatus: 404 })
            setLoading(false)
            return
        }

        setMessages(res)
        setLoading(false)

        // scroll to bottom after DOM updates
        if (messagesRef.current) {
            requestAnimationFrame(() => {
                messagesRef.current.scrollTop = messagesRef.current.scrollHeight
            })
        }
    }

    const fetchOlderData = async () => {
        if (!messages?.nextCursor) return

        setLoading(true)
        const res = await getMessages(otherUserId, messages.nextCursor)

        if (res?.status === 401) {
            navigate('/login', { replace: true })
            return
        }
        
        if (!messagesRef.current) return
        const container = messagesRef.current
        const prevScrollHeight = container.scrollHeight
        const prevScrollTop = container.scrollTop

        setMessages(prev => ({
            ...prev,
            messages: [...res.messages, ...prev.messages],
            nextCursor: res.nextCursor
        }))
        setLoading(false)

        // preserve scroll after DOM update
        requestAnimationFrame(() => {
            if (messagesRef.current) {
                const newScrollHeight = messagesRef.current.scrollHeight
                messagesRef.current.scrollTop = newScrollHeight - prevScrollHeight + prevScrollTop
            }
        })

    }

    const handleScroll = () => {
        if (!messagesRef.current || !messages?.nextCursor) return

        const container = messagesRef.current
        if (container.scrollTop === 0) {
            if (isTokenExpiredOrInvalid()) {
                setLoading(false)
                navigate('/login', { replace: true })
                return
            }
            fetchOlderData()
        }
    }

    const handleSend = async (message) => {
        if (isTokenExpiredOrInvalid()) {
            navigate('/login', { replace: true })
            return
        }
        await sendMessage(otherUserId, message)
        fetchLatestData()
    }

    const handleStatusChange = async (newStatus) => {
        if (isTokenExpiredOrInvalid()) {
            navigate('/login', { replace: true })
            return
        }
        await setStatus(otherUserId, newStatus)
        fetchLatestData()
    }

    useEffect(() => { // if chat changes
        setMessages(null)
        fetchLatestData()
    }, [otherUserId])

    return (
        <Wrapper>
            <Messages
                handleScroll={handleScroll}
                messagesRef={messagesRef}
                messages={messages?.messages}
                loading={loading}
            />

            <SendMessage
                handleSend={handleSend}
                handleStatusChange={handleStatusChange}
                status={messages?.chatStatus}
                statusUpdatedBy={messages?.statusUpdatedBy}
                loggedInUserId={loggedInUserId}
                loading={loading}
            />
        </Wrapper>
    )
}

export default MessageBox

const Wrapper = styled.div`
    width: 100%;
    height: 89%;
`