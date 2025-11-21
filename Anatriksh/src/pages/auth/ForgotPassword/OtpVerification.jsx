import React, { useState, useRef } from "react";
import AuthLayout from "../../../components/auth/AuthLayout";
import { useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) inputRefs.current[index + 1].focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const code = otp.join("");

    if (code.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    navigate("/forgot/create-new-password");
  };

  return (
    <AuthLayout
      title="Verify OTP"
      subtitle="Enter the 6-digit code sent to your email"
    >
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", gap: "25px" }}>
          {otp.map((digit, index) => (
            <input
              key={index}
              maxLength="1"
              value={digit}
              className="otp-box"
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleChange(e.target.value, index)}
            />
          ))}
        </div>

        {error && <p className="validation-error">{error}</p>}

        <button className="submit-button" style={{ marginTop: 20 }}>
          Verify OTP
        </button>

        <div className="secondary-button" style={{ marginTop: 10 }}>
          <a href="/login">Back to Login</a>
        </div>
      </form>
    </AuthLayout>
  );
};

export default OtpVerification;
