import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { containsSpaces } from "../utils"
import { signupUser } from "../api/authQueries"
import styled from "styled-components"

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
        <Wrapper>
            <div className="content">

                <div className="greeting">
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
                    {error && <p className="error">{error}</p>}
                    <button>Signup</button>
                </form>
                <Link to='/login'>Login instead</Link>
            </div>
        </Wrapper>
    )
}

export default Signup

const Wrapper = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;

    input {
      width: 17rem;
      height: 3rem;
      padding: 1rem;
      border-radius: 2rem;
      border: 1px solid #33333347;
      font-size: 15px;
    }

    button {
      color: white;
      background-color: #0575E6;
      width: 17rem;
      height: 3rem;
      border-radius: 2rem;
      border: 0;

      &:hover {
        cursor: pointer;
      }
    }
  }

  .greeting {
    :first-child {
      font-size: 40px;
      font-weight: 900;
      margin-block-start: 0;
      margin-block-end: 0;
    }
    
    p {
      padding: 0;
      margin-block-start: 0;
      margin-block-end: 0;
      font-size: 20px;
    }

    margin-bottom: 3rem;
  }

  a {
    align-self: center;
    margin: 2rem;
    color: #333333;
  }

  .error {
    padding: 0;
    margin: -10px;
    color: red;
  }
`