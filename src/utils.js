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

export {
    setToken,
    getToken,
    deleteToken,
    containsSpaces
}