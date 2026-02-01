import { Link, useNavigate } from "react-router-dom"
import { deleteToken } from "../utils"

const Header = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        deleteToken()
        navigate('/login', {replace: true})   
    }

    return (
        <div>
            <div>
                <h1>Messages</h1>
                <a 
                    href="https://github.com/Punith1117/messaging-frontend" 
                    target="_blank"
                    rel="noopener noreferrer"
                >by Punith1117</a>
            </div>
            <div>
                <Link to={'/profile'}>Profile</Link>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default Header