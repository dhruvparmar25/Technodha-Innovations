import React from "react";
import { useNavigate } from "react-router-dom";

const ForgotPasswordForm = ({
  forgotEmail,
  setForgotEmail,
  forgotErrors,
  setForgotErrors,
  switchToLogin,
}) => {

  const navigate = useNavigate();

  // ✅ Email Validation Inside Component
  const validateEmailBeforeNavigate = () => {
    let errors = {};
    let isValid = true;

    if (!forgotEmail.trim()) {
      errors.forgotEmail = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail)) {
      errors.forgotEmail = "Enter a valid email";
      isValid = false;
    }

    setForgotErrors(errors);
    return isValid;
  };

  const handleResetClick = () => {
    if (validateEmailBeforeNavigate()) {
      navigate("/forgot/verify-otp");   // ✅ Only navigate if email is valid
    }
  };

  return (
    <form>

      {/* Email Input */}
      <div className="form-group">
        <label htmlFor="forgotEmail" className="form-label">
          Email Address
        </label>

        <input
          type="text"
          className="form-input"
          id="forgotEmail"
          placeholder="Enter Your Email"
          value={forgotEmail}
          onChange={(e) => setForgotEmail(e.target.value)}
        />

        {forgotErrors.forgotEmail && (
          <div className="validation-error">{forgotErrors.forgotEmail}</div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="button"
        className="submit-button"
        onClick={handleResetClick}
      >
        Send Reset Link
      </button>

      {/* Back to Login */}
      <button
        type="button"
        className="secondary-button"
        onClick={switchToLogin}
      >
        Back to Login
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
