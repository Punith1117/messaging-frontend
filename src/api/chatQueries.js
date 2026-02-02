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

const setStatus = async (otherUserId, newStatus) => {
    let res
    try {
        res = await fetch(`${url}/chat/${otherUserId}/${newStatus}`, {
            method: 'POST',
            headers: {
                "authorization": `Bearer ${getToken()}`
            }
        })
        if (!res.ok) {
            console.log("Error: " + res.status)
            return
        }   
    } catch (e) {
        console.error(e)
    }
}

const getMessages = async (userId, cursor) => {
    let res
    const limit = 15
    try {
        let finalUrl

        if (cursor === null || cursor === undefined) {
            finalUrl = `${url}/message/${userId}?limit=${limit}`
        } else {
            finalUrl = `${url}/message/${userId}?limit=${limit}&cursor=${cursor}`
        }

        res = await fetch(finalUrl, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${getToken()}`
            }
        })
        if (!res.ok) {
            return {
                status: res.status
            }
        }
        res = await res.json()
        return res
    } catch (e) {
        console.error(e)
        return {status: 500} // server error 
    }
}

export {
    getAllChats,
    sendMessage,
    setStatus,
    getMessages
}