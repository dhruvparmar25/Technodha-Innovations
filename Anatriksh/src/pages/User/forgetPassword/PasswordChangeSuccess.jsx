import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorSignupSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="success-container">
      <div className="suc-img">
        <img src="/Password_success.png" alt="Success" className="success-image" />
      </div>
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
