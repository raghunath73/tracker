import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For redirection
import axios from "axios";
import "./login.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const payload = { username, password };
    setLoading(true); // Start loading state

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/login/",  // POST request to Django backend
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      setMessage("Login successful! Redirecting...");
      localStorage.setItem("token", response.data.token);  // Save token to local storage

      setTimeout(() => navigate("/dashboard"), 2000);  // Redirect to dashboard after 2 seconds
    } catch (error) {
      setMessage(error.response ? error.response.data.detail : "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <main className="login-content">
        <h2 className="login-heading">Login</h2>

        <form onSubmit={handleSubmit} className="login-form">
          {/* Username Input */}
          <div className="input-container">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Username"
              className="login-input"
              required
            />
          </div>

          {/* Password Input */}
          <div className="input-container">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="login-input"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="submit-container">
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          {/* Message Display */}
          {message && <p className="login-message">{message}</p>}
        </form>
      </main>
    </div>
  );
};

export default LoginPage;
