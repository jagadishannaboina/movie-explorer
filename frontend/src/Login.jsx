import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      setMessage(
        "Login successful"
      );

      navigate("/");

    } catch (err) {

      setMessage(
        err.response?.data?.message ||
        "Login failed"
      );

    }
  };

  return (
    <div className="login-container">

      <form
        className="login-form"
        onSubmit={handleLogin}
      >

        <h1>🎬 Login</h1>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit">
          Login
        </button>

        {message && (
          <p>{message}</p>
        )}

      </form>
    </div>
  );
}

export default Login;