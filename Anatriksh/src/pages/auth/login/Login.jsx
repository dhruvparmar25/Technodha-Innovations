import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import AuthLayout from "../../../components/auth/AuthLayout";
import api from "../../../api/axiosClient";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState("");

  const validateLogin = () => {
    let e = {};
    let ok = true;

    if (!email.trim()) (e.email = "Email is required"), (ok = false);
    if (!email.includes("@")) (e.email = "Invalid email"), (ok = false);

    if (!password.trim()) (e.password = "Password required"), (ok = false);

    setErrors(e);
    return ok;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;

    try {
      const response = await api.post("/users/login/", { email, password });
      const user = response.data.data;

      localStorage.setItem("access_token", user.access_token);
      localStorage.setItem("refresh_token", user.refresh_token);

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: user.id,
          email: user.email,
          role: user.role,
        })
      );

      setAlert("Login Successful!");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      setAlert(error.response?.data?.detail || "Invalid credentials");
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to your doctor account"
    >
      {alert && <div className="alert-box error">{alert}</div>}

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
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle-button"
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>

          {errors.password && (
            <div className="validation-error">{errors.password}</div>
          )}
        </div>

        {/* Options */}
        <div className="form-options-row">
          <div>
            <input type="checkbox" id="remember" /> Remember Me
          </div>
          <NavLink to="/forgot">Forgot Password?</NavLink>
        </div>

        <button className="submit-button">Login</button>

        <p className="toggel-btn">
          Don’t have an account? <NavLink to="/signup/step1">Signup</NavLink>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
