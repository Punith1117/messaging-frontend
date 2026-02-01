import { getToken } from "../utils"

const url = 'http://localhost:3000'
const saveMyDetails = async (casualName, mood) => {
    try {
        let res = await fetch(`${url}/profile`, {
            method: 'PATCH',
            headers: {
                "authorization": `Bearer ${getToken()}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                casualName,
                mood
            })
        })
        if (res.status === 401) return 401
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}

const getMyDetails = async () => {
    let res = await fetch(`${url}/profile`, {
        method: 'GET',
        headers: {
            "authorization": `Bearer ${getToken()}`
        }
    })

    if (res.status === 401) return res.status

    res = await res.json()

    return res.profile
}

const getAvailableMoods = async () => {
    let res = await fetch (`${url}/meta/moods`, {
        method: 'GET'
    })

    res = await res.json()
    return res.moods
}

const getUserDetails = async (id) => {
    let res = await fetch(`${url}/profile/${id}`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${getToken()}`
        }
    })
    
    if (res.status === 401 || res.status ==+ 404) return res.status
    
    res = await res.json()
    return res.profile
}

export {
    saveMyDetails,
    getMyDetails,
    getAvailableMoods,
    getUserDetails
}