import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/AuthService";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");

    authService.login(username, password)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setMessage("✅ Login successful");
        setTimeout(() => navigate("/eligibility"), 1000);
      })
      .catch(() => {
        setMessage("❌ Invalid credentials. Please try again.");
      });
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">Login</button>
      </form>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}

export default Login;
