const url = import.meta.env.VITE_BACKEND_URL

const loginUser = async (username, password) => {
    let res = await fetch(`${url}/auth/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username, password})
    })

    res = await res.json()
    if (res.error) {
        throw new Error(res.error.message)
    }

    return res
}

const signupUser = async (username, password, casualName) => {
    let res = await fetch(`${url}/auth/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username, password, casualName})
    })

    res = await res.json()
    if (res.error) {
        throw new Error(res.error.message)
    }
}

export {
    loginUser,
    signupUser
}