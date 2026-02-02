import { getToken } from "../utils"

const url = 'http://localhost:3000'

const getAllChats = async () => {
    let res = await fetch(`${url}/chat`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${getToken()}`
        }
    })

    if (res.status === 401) return res.status

    res = await res.json()
    return res.chats
}

export {
    getAllChats
}