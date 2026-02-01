import { getToken } from "../utils"

const getAllChats = async () => {
    let res = await fetch('http://localhost:3000/chat', {
        method: 'GET',
        headers: {
            authorization: `Bearer ${getToken()}`
        }
    })

    if (res.status === 401) return res.status

    res = await res.json()
    return res.chats
}

export default getAllChats