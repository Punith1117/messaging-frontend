import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/authQueries";
import { setToken } from "../utils";
import styled from "styled-components";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { token } = await loginUser(username, password);
      setToken(token);
      navigate("/profile", {replace: true});
    } catch (err) {
      setError(err.message)
    }
  };

  return (
    <Wrapper>
      <div className="content">
        <div className="greeting">
            <p>Hello Again!</p>
            <p>Welcome Back</p>
        </div>
        <form onSubmit={handleSubmit}>
        <input
            placeholder="Username"
            value={username}
            onChange={(e) => {
                setUsername(e.target.value)
                if (error) setError(null)
            }}
        />
        <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => {
                setPassword(e.target.value)
                if (error) setError(null)
            }}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
        </form>
        <Link to={'/signup'}>Signup instead</Link>
      </div>
    </Wrapper>
  );
};

export default Login;

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

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    min-height: 100vh;

    .content {
      margin-bottom: -14rem;
    }
  }
`