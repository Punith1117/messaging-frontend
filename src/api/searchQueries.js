import { getToken } from "../utils"

const searchUser = async (text) => {
    let res = await fetch(`http://localhost:3000/user?q=${text}`, {
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