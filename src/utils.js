import { jwtDecode } from "jwt-decode"

const TOKEN = 'token'

const setToken = (token) => {
    localStorage.setItem(TOKEN, token)
}

const getToken = () => {
    return localStorage.getItem(TOKEN)
}

const deleteToken = () => {
    localStorage.removeItem(TOKEN)
}

const containsSpaces = (text) => {
    return /\s/.test(text)
}

const isTokenExpiredOrInvalid = () => {
    const token = getToken()

    if (!token) return true // invalid

    try {
        const {exp} = jwtDecode(token)
        const timeLeft = (exp * 1000) - Date.now()

        if (timeLeft <= 2000)
            return true // expired
        else
            return false // valid
    } catch (e) {
        return true // invalid
    }
}

export {
    setToken,
    getToken,
    deleteToken,
    containsSpaces,
    isTokenExpiredOrInvalid
}