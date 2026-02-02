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

const sendMessage = async (toId, content) => {
    toId = parseInt(toId)
    let res
    try {
        res = await fetch(`${url}/message`, {
            method: 'POST',
            headers: {
                "authorization": `Bearer ${getToken()}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                toId,
                content
            })
        })

        if(!res.ok) {
            console.log("Error: " + res.status)
            return
        }
    } catch (e) {
        console.error(e.message)
    }
}

export {
    getAllChats,
    sendMessage
}