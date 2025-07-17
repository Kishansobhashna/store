import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import "./Login.css";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleGoogleLogin = async (response) => {
    try {
      const res = await axios.post("http://localhost:5000/google-login", {
        credential: response.credential,
      });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Google Login successful!");
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error("Google login failed", err);
      toast.error("Google login failed");
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      toast.success("Login successful!");
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Login Failed", error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="center-text">Login</h2>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <button className="login" type="submit">Login</button>

          <p style={{ textAlign: "center" }}>
            Don't have an account?{" "}
            <Link to="/signup" className="toggle-link">Sign Up</Link>
          </p>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => toast.error("Google Login Failed")}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
