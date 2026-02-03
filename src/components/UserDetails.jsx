import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getUserDetails } from "../api/userQueries"

const UserDetails = () => {
    const { userId } = useParams()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const fetchUser = async () => {
        try {
            setLoading(true)
            const data = await getUserDetails(userId)
            if (data === 401) {
                navigate('/login', {replace: true})
                return                
            } else if (data === 404) {
                navigate('/') // page not found
                return
            }
            setUser(data)
        } catch (err) {
            navigate('/login', {replace: true})
            return                
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [userId])

    if (loading) return <p>Loading user details...</p>
    if (!user) return <p>User not found</p>

    return (
        <div>
            <p>{user.username}</p>
            {user.casualName && (
                <p>{user.casualName}</p>
            )}
            {user.mood && (
                <p>{user.mood}</p>
            )}
        </div>
    )
}

export default UserDetails