import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorSignupSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="success-container">
      <div className="suc-img">
        <img src="/success.png" alt="Success" className="success-image" />
      </div>
      <h2 className="success-title">Account Created Successfully!</h2>
      <p className="success-message">
        Your doctor account has been created. Please log in to complete your
        profile and start managing patients
      </p>
      <button
        type="button"
        className="submit-button"
        onClick={() => navigate("/login")}
      >
        Go to Login
      </button>
    </div>
  );
};

export default DoctorSignupSuccess;
