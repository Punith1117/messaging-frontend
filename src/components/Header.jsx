import { Link, useNavigate } from "react-router-dom"
import { deleteToken } from "../utils"
import styled from "styled-components"
import profileIcon from "../assets/profile.png"
import logoutIcon from "../assets/logout.png"

const Header = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        deleteToken()
        navigate('/login', {replace: true})   
    }

    return (
        <Wrapper>
            <div className="app-details">
                <h1>Messages</h1>
                <a 
                    href="https://github.com/Punith1117/messaging-frontend" 
                    target="_blank"
                    rel="noopener noreferrer"
                    title="source-code"
                >by Punith1117</a>
            </div>
            <div className="navigation">
                <Link to={'/profile'} title="profile">P</Link>
                <button onClick={handleLogout} title="logout" />
            </div>
        </Wrapper>
    )
}

export default Header

const Wrapper = styled.div`
    height: 10%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;

    .app-details {
        
        h1 {
            margin: 0;
            font-weight: 600;
        }
        
    }

    .navigation {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1.5rem;

        a {
            background-image: url(${profileIcon});
            color: transparent;
        }
        
        button {
            background-image: url(${logoutIcon});
            border: 0;
        }
        
        * {
            width: 40px;
            height: 40px;
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center;
            &:hover {
                cursor: pointer;
                filter: brightness(0.6);
            }
        }
    }

`