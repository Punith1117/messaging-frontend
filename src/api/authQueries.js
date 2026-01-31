const loginUser = async (username, password) => {
    let res = await fetch('http://localhost:3000/auth/login', {
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

export {
    loginUser
}