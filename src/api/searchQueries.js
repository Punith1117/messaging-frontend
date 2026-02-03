import { getToken } from "../utils"

const url = import.meta.env.VITE_BACKEND_URL

const searchUser = async (text) => {
    let res = await fetch(`${url}/user?q=${text}`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${getToken()}`
        }
    })

    if (res.status == 401) return res.status // unauthorized

    res = await res.json()
    res = res.users
    return res
}

export {
    searchUser
}