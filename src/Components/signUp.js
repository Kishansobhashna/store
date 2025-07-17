import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import "./signUp.css";

const SignUp = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
  });
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const handleGoogleLogin = async (response) => {
      try 
      {
        const res = await axios.post("http://localhost:5000/google-login", {
          credential: response.credential,
        });
  
        const { token, user } = res.data;
  
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
  
        toast.success("Google Login successful!");
        navigate("/");
        window.location.reload();
      } 
      catch (err) 
      {
        console.error("Google login failed", err);
        toast.error("Google login failed");
      }
  };

  const validateForm = () => {
    const errors = {};

    if (!formValues.username) 
    {
      errors.username = "Username is required";
    } else if (!/^[A-Za-z0-9_]{3,15}$/.test(formValues.username)) {
      errors.username =
        "Username should be 3-15 characters long and can only contain letters, numbers, and underscores.";
    }

    if (!formValues.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formValues.mobile) {
      errors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formValues.mobile)) {
      errors.mobile = "Mobile number should be 10 digits";
    }

    if (!formValues.password) {
      errors.password = "Password is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validateForm()) return;

      if (!otpVerified) {
        toast.error("Please verify your OTP first");
        return;
      }

      try {
        const response = await axios.post("http://localhost:5000/signup", formValues);
        if (response.data.success) {
          toast.success(response.data.message);
          setFormValues({ username: "", email: "", mobile: "", password: "" });
          setFormErrors({});
          setOtp(""); setOtpVerified(false); setOtpSent(false);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error during registration:", error);
        toast.error(error.response?.data?.message || "Something went wrong.");
      }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <form onSubmit={handleSubmit}>
          <h2 className="center-text">Sign Up</h2>

          <div className="form-group1">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              name="username"
              value={formValues.username}
              onChange={handleInputChange}
            />
            {formErrors.username && <p className="error-text">{formErrors.username}</p>}
          </div>

          <div className="form-group1">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formValues.email}
              onChange={handleInputChange}
            />
            {formErrors.email && <p className="error-text">{formErrors.email}</p>}
          </div>

          <div className="form-group1">
            <label>Mobile No</label>
            <input
              type="tel"
              name="mobile"
              placeholder="Enter your mobile number"
              value={formValues.mobile}
              onChange={handleInputChange}
              disabled={otpSent}
            />
          
            
            {formErrors.mobile && <p className="error-text">{formErrors.mobile}</p>}
            </div>


          <div className="form-group1">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formValues.password}
              onChange={handleInputChange}
            />
            {formErrors.password && <p className="error-text">{formErrors.password}</p>}
          </div>

          <button type="submit" className="signup-btn">
            Sign Up
          </button>

          <p style={{ textAlign: "center" }}>
            Already have an account?{" "}
            <Link to="/login" className="toggle-link">
              Login
            </Link>
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
};

export default SignUp;
