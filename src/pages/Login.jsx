import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/authQueries";
import { setToken } from "../utils";

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
    <div>
        <div>
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
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
        </form>
        <Link to={'/signup'}>Signup instead</Link>
    </div>
  );
};

export default Login;
