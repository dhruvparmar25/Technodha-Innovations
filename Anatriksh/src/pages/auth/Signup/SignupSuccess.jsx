// Signup success page
import React from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../../components/auth/AuthLayout";

const SignupSuccess = () => {
    const navigate = useNavigate();

    return (
        <AuthLayout title="Account Created">
            <div className="success-container">
                {/* Image */}
                <img src="/success.png" className="success-image" alt="Success" />

                <h2>Signup Completed</h2>
                <p>Your account is ready. Please login.</p>

                {/* Go to login */}
                <button className="submit-button" onClick={() => navigate("/login")}>
                    Go to Login
                </button>
            </div>
        </AuthLayout>
    );
};

export default SignupSuccess;
