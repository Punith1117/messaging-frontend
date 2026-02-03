import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { searchUser } from "../api/searchQueries"
import useDebounce from "../hooks/useDebounce"
import styled from "styled-components"
import closeIcon from "../assets/search-close.png"

const Searchbar = () => {
    const [text, setText] = useState('')
    const [result, setResult] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const debouncedText = useDebounce(text);

    const handleSearch = async () => {
        if (debouncedText === '') {
            if (loading) setLoading(false)
            return
        }
        if (debouncedText.trim() === '') {
            setResult([])
            return
        }
        setLoading(true)
        let res = await searchUser(debouncedText.trim())
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
    }, [debouncedText])

    return (
        <Wrapper>
            <div className="input-wrapper">
                <input 
                    type="text" 
                    onChange={e => setText(e.target.value)}
                    value={text}
                    placeholder="Search username"
                />
                {text && <button onClick={handleClose} />}
            </div>
            {loading ? <div className="results">Loading...</div> :
                (text && <div className="results">
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
        </Wrapper>
    )
}

const User = ({id , username, casualName}) => {
    return (
        <UserWrapper>
            <Link to={`/chat/${id}`}>
                <p className="username">{username}</p>
                <p className="casual-name">{casualName}</p>
            </Link>
        </UserWrapper>
    )
}

const UserNotFound = () => {
    return (
        <div className="user-not-found">
            <p>No user found</p>
            <p>usernames are case sensitive and do not contain spaces</p>
            <p>Try a different username</p>
        </div>
    )
}

export default Searchbar

const Wrapper = styled.div`
    width: 100%;
    height: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    border-top: 1px solid #cfcfcf;
    border-bottom: 1px solid #cfcfcf;
    padding: 10px;

    .input-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #c9c7c7;
        width: 80%;
        height: 3rem;
        position: relative;
        border-radius: 1rem;
        background-color: #F3F3F3;
        
        input {
            width: 100%;
            height: 100%;
            border-radius: 1rem;
            border: 0;
            padding: 10px;
            font-size: 16px;
            letter-spacing: 1px;
        }

        button {
            position: absolute;
            width: 30px;
            height: 30px;

            background-image: url(${closeIcon});
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;

            border: none;
            background-color: transparent;
            cursor: pointer;
            right: 20px;
        }
    }
    
    .results {
        background-color: transparent;
        position: absolute;
        top: 100%;
        width: 80%;
        max-height: 40rem;
        display: flex;
        flex-direction: column;
        gap: 5px;
        overflow-y: scroll;
        overflow-x: visible;
        scrollbar-width: none;
        padding: 10px;

        .user-not-found {
            background-color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 10px 15px;
            gap: 4px;
            font-size: 16px;
            border-radius: 6px;
            box-shadow: 3px 3px 4px #777777;
    
            p:first-child {
                font-weight: 500;
                font-size: 18px;
            }

            p {
                margin: 0;
            }
        }
    }

`

const UserWrapper = styled.div`
    width: 100%;
    height: 2.5rem;
    background-color: white;
    display: flex;
    box-shadow: 3px 3px 4px #777777;

    a {
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        display: flex;
        gap: 5px;
        text-decoration-line: none;

        .username {
            color: black;
            font-weight: 500;
        }

        .casual-name {
            color: #777777;
        }
    }

    &:hover {
        background-color: #f0f0f0;
    }
`