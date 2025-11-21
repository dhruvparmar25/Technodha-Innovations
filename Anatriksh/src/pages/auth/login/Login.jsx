import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import AuthLayout from "../../../components/auth/AuthLayout";
import AlertBox from "../../../components/common/AlertBox";
import api from "../../../api/axiosClient"; // remove if not using API

const Login = () => {
  const navigate = useNavigate();

  // Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Errors
  const [errors, setErrors] = useState({});

  // AlertBox
  const [alert, setAlert] = useState({ type: "", message: "" });

  // Show Password
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () =>
    setShowPassword((prev) => !prev);

  // Validation
  const validate = () => {
    let e = {};

    if (!email.includes("@")) e.email = "Invalid email";
    if (password.length < 6) e.password = "Min 6 characters";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Submit Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      setAlert({ type: "error", message: "Please fix the errors above." });
      return;
    }

    try {
      // API Request (if needed)
      const res = await api.post("/users/login/", { email, password });

      const user = res.data.data;

      // Save token
      localStorage.setItem("access_token", user.access_token);
      localStorage.setItem("refresh_token", user.refresh_token);

      // Save user info
      localStorage.setItem("user", JSON.stringify(user));

      setAlert({ type: "success", message: "Login Successful!" });

      // Redirect after alert
      setTimeout(() => navigate("/dashboard"), 3000);
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data?.detail || "Invalid credentials",
      });
    }
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Login to continue">

      {/* ALERT BOX */}
      {alert.message && (
        <AlertBox
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ type: "", message: "" })}
        />
      )}

      <form onSubmit={handleSubmit}>
        
        {/* Email */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            className="form-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div className="validation-error">{errors.email}</div>}
        </div>

        {/* Password */}
        <div className="form-group password-group">
          <label>Password</label>
          <div className="input-with-icon-container">
            <input
              type={showPassword ? "text" : "password"}
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="password-toggle-button"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>

          {errors.password && (
            <div className="validation-error">{errors.password}</div>
          )}
        </div>

        {/* Forgot password */}
        <div className="form-options-row">
          <div></div>

          <NavLink to="/forgot" className="forgot-password-link">
            Forgot password?
          </NavLink>
        </div>

        <button className="submit-button" type="submit">
          Login
        </button>

        <p className="toggel-btn">
          Don't have an account? <NavLink to="/signup/step1">Signup</NavLink>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
