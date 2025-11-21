import React, { useState, useRef } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../../components/auth/AuthLayout";
import AlertBox from "../../../components/common/AlertBox";

const OtpVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const inputRefs = useRef([]);

  const handleInput = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const updated = [...otp];
      updated[index] = value;
      setOtp(updated);

      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const code = otp.join("");

    if (code.length !== 6) {
      setAlert({ type: "error", message: "Enter a valid 6-digit OTP" });
      return;
    }

    setAlert({ type: "success", message: "OTP Verified!" });

    setTimeout(() => navigate("/forgot/create-new-password"), 1500);
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

      <div className="back-arrow" onClick={() => navigate("/forgot")}>
        <FaAngleLeft size={20} color="#7C3AED" />
      </div>

      <div className="form-title">
        <h1>Verify OTP</h1>
        <p>Enter the 6-digit code sent to your email</p>
      </div>

      <form onSubmit={handleVerify}>
        <div style={{ display: "flex", gap: "30px", marginTop: "25px" }}>
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              ref={(el) => (inputRefs.current[index] = el)}
              value={digit}
              onChange={(e) => handleInput(e.target.value, index)}
              className="otp-box"
            />
          ))}
        </div>

        <button type="submit" className="submit-button" style={{ marginTop: "25px" }}>
          Verify OTP
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

export default OtpVerification;
