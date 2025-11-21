import React from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../../components/auth/AuthLayout";

const SignupSuccess = () => {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <div className="success-container">
        <img src="/success.png" className="success-image" alt="success" />
        <h2>Account Created Successfully!</h2>
        <p>You can now log in to continue</p>

        <button
          className="submit-button"
          onClick={() => navigate("/login")}
        >
          Go to Login
        </button>
      </div>
    </AuthLayout>
  );
};

export default SignupSuccess;
