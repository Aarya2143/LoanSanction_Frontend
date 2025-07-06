import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/AuthService";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");

    authService.register(username, password)
      .then((res) => {
        setMessage(`✅ ${res.data}`);
        setTimeout(() => navigate("/login"), 1000);
      })
      .catch(() => {
        setMessage("❌ Registration failed. Try again.");
      });
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4 text-center">Register</h2>
      <form onSubmit={handleRegister}>
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
        <button className="btn btn-primary w-100" type="submit">Register</button>
      </form>
      {message && (
        <div className="mt-3 text-center">
          <span>{message}</span>
        </div>
      )}
    </div>
  );
}

export default Register;
