import React, { useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import AuthLayout from "../ui/AuthLayout";

const OtpVerificationPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleInput = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const code = otp.join("");

    if (code.length === 6) {
      navigate("/reset-password");
    }
  };

  return (
    <AuthLayout
      title="Verify Your Email"
      subtitle="Enter the 6-digit OTP we’ve sent to your email:"
    >
      <div className="email">
        <a href="#">doctor@example.com</a>
      </div>

      <form onSubmit={handleVerify}>
        <div
          style={{
            display: "flex",
            gap: "40px",
            marginTop: "35px",
            marginBottom: "12px",
          }}
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleInput(e.target.value, index)}
              className="otp-box"
            />
          ))}
        </div>

        <div style={{ marginTop: "10px", textAlign: "center" }}>
          Didn’t receive the code ?
          <NavLink to="#" style={{ color: "var(--color-primary)" }}>
            Resend OTP
          </NavLink>
        </div>

        <button
          type="submit"
          className="submit-button"
          style={{ marginTop: "20px" }}
        >
          Verify OTP
        </button>
        <div className="secondary-button" style={{ textAlign: "center" }}>
          <NavLink to="/login">Back to Login</NavLink>
        </div>
      </form>
    </AuthLayout>
  );
};

export default OtpVerificationPage;
