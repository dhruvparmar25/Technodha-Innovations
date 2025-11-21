import React, { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../../components/auth/AuthLayout";
import AlertBox from "../../../components/common/AlertBox";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ type: "", message: "" });

  const validate = () => {
    let e = {};
    if (!email.trim()) e.email = "Email is required";
    else if (!email.includes("@")) e.email = "Enter a valid email";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleResetClick = () => {
    if (!validate()) {
      setAlert({ type: "error", message: "Please fix the errors above." });
      return;
    }

    setAlert({ type: "success", message: "OTP Sent to your email" });

    setTimeout(() => navigate("/forgot/verify-otp"), 1500);
  };

  return (
    <AuthLayout>
      {alert.message && (
        <AlertBox
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ type: "", message: "" })}
        />
      )}

      <form>
        <div className="back-arrow" onClick={() => navigate("/login")}>
          <FaAngleLeft size={20} color="#7C3AED" />
        </div>

        <div className="form-title">
          <h1>Reset Your Password</h1>
          <p>We will send a reset link to your email</p>
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email Address</label>
          <input
            className="form-input"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="validation-error">{errors.email}</p>}
        </div>

        <button type="button" className="submit-button" onClick={handleResetClick}>
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
