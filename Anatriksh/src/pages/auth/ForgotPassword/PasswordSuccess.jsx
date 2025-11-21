import React from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../../components/auth/AuthLayout";

const PasswordSuccess = () => {
    const navigate = useNavigate();

    return (
        <AuthLayout>
            <div className="success-container">
                <img src="/Password_success.png" className="success-image" alt="success" />
                <button type="button" className="submit-button" onClick={() => navigate("/login")}>
                    Go to Login
                </button>
            </div>
        </AuthLayout>
    );
};

export default PasswordSuccess;
