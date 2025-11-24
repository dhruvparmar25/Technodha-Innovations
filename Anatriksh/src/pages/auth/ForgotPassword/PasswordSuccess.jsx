// Password reset success page
import React from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../../components/auth/AuthLayout";

const PasswordSuccess = () => {
    const navigate = useNavigate();

    return (
        <AuthLayout title="Password Updated">
            <div className="success-container">
                {/* Success image */}
                <img src="/Password_success.png" className="success-image" alt="Success" />

                <h2>Password Changed</h2>
                <p>You can now log in with your new password.</p>

                {/* Go to login */}
                <button type="button" className="submit-button" onClick={() => navigate("/login")}>
                    Go to Login
                </button>
            </div>
        </AuthLayout>
    );
};

export default PasswordSuccess;
