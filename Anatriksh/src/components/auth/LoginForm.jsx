import React from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  errors,
  handleSubmit,
  showPassword,
  togglePasswordVisibility,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="text"
          className="form-input"
          id="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <div className="validation-error">{errors.email}</div>}
      </div>
      <div className="form-group password-group">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <div className="input-with-icon-container">
          <input
            type={showPassword ? "text" : "password"}
            className="form-input"
            id="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="password-toggle-button"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <FaRegEyeSlash size={20} aria-label="Hide password" />
            ) : (
              <FaRegEye size={20} aria-label="Show password" />
            )}
          </button>
        </div>
        {errors.password && (
          <div className="validation-error">{errors.password}</div>
        )}
      </div>
      <div className="form-options-row">
        <div className="form-check-group">
          <input className="form-check-input" type="checkbox" id="rememberMe" />
          <label className="form-check-label" htmlFor="rememberMe">
            Remember me
          </label>
        </div>
        <NavLink to="/forgot" className="forgot-password-link">
          Forgot password?
        </NavLink>
      </div>

      <button type="submit" className="submit-button">
        Login
      </button>

      <p className="toggel-btn">
        Already have an account? <NavLink to="/signup">signup</NavLink>
      </p>
    </form>
  );
};

export default LoginForm;
