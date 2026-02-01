import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { searchUser } from "../api/searchQueries"

const Searchbar = () => {
    const [text, setText] = useState('')
    const [result, setResult] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSearch = async () => {
        if (text === '') {
            if (loading) setLoading(false)
            return
        }
        if (text.trim() === '') {
            setResult([])
            return
        }
        setLoading(true)
        let res = await searchUser(text.trim())
        setLoading(false)
        if (res === 401) {
            navigate('/login', {replace: true})
            return
        }
        setResult(res)
    }

    const handleClose = () => {
        setText('')
        setResult([])
        setLoading(false)
    }

    useEffect(() => {
        handleSearch()
    }, [text])

    return (
        <div>
            <div>
                <input 
                    type="text" 
                    onChange={e => setText(e.target.value)}
                    value={text}
                    placeholder="Search username"
                />
                {text && <button onClick={handleClose}>Close</button>}
            </div>
            {loading ? <div>Loading...</div> :
                (text && <div>
                    {(result.length !== 0) && result.map(user => (
                        <User 
                            key={user.id} 
                            id={user.id} 
                            username={user.username} 
                            casualName={user.casualName} 
                        />
                    ))}
                    {(result.length === 0)  && <UserNotFound />}
                </div>)
            } 
        </div>
    )
}

const User = ({id , username, casualName}) => {
    return (
        <div>
            <Link to={`/chat/${id}`}>
                <p>{username}</p> 
                <p>{casualName}</p>
            </Link>
        </div>
    )
}

const UserNotFound = () => {
    return (
        <div>
            <p>No user found</p>
            <p>usernames are case sensitive and do not contain spaces</p>
            <p>Try a different username</p>
        </div>
    )
}

export default Searchbar