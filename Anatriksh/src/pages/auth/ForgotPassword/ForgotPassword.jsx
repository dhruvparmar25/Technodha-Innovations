import React, { useState } from "react";
import AuthLayout from "../../../components/auth/AuthLayout";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const validateEmail = () => {
    let e = {};
    let ok = true;

    if (!email.trim()) (e.email = "Email required"), (ok = false);
    else if (!email.includes("@")) (e.email = "Invalid email"), (ok = false);

    setErrors(e);
    return ok;
  };

  const handleSubmit = () => {
    if (validateEmail()) {
      navigate("/forgot/verify-otp");
    }
  };

  return (
    <AuthLayout
      title="Forgot Password?"
      subtitle="Enter your email to get OTP"
    >
      <form>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="text"
            className="form-input"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="validation-error">{errors.email}</p>}
        </div>

        <button type="button" className="submit-button" onClick={handleSubmit}>
          Send OTP
        </button>

        <button
          type="button"
          className="secondary-button"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </button>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
