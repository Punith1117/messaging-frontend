import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { containsSpaces } from "../utils"
import { signupUser } from "../api/authQueries"

const Signup = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [casualName, setCasualName] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (error) return
        
        const trimmedCasualName = casualName.trim()
        
        try {
            await signupUser(username, password, trimmedCasualName || null)
            navigate('/login', {replace: true})
        } catch (e) {
            setError(e.message)
        }
    }

    useEffect(() => {
        if (containsSpaces(username) || username === '') {
            setError('username cannot contain spaces or be blank')
            return
        } else if (containsSpaces(password) || password === '') {
            setError('password cannot contain spaces or be blank')
            return
        } else if (password !== confirmPassword || confirmPassword === '') {
            setError('passwords do not match')
            return
        }

        setError(null)
    }, [username, password, confirmPassword])

    return (
        <div>
            <div>
                <p>Hello!</p>
                <p>Sign Up to Get Started</p>
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" 
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
                <input type="password" 
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <input type="password" 
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                />
                <input type="text" 
                    placeholder="Casual Name(Optional)"
                    onChange={((e) => setCasualName(e.target.value))}
                    value={casualName}
                />
                {error && <p>{error}</p>}
                <button>Signup</button>
            </form>
            <Link to='/login'>Login instead</Link>
        </div>
    )
}

export default Signup