// Auth page layout wrapper
import React from "react";

const AuthLayout = ({ title = "", subtitle = "", children }) => {
    return (
        <div className="auth">
            {/* Left side image */}
            <div className="auth-img">
                <div className="logo">
                    <img src="/logo.png" alt="Logo" />
                </div>
                <div className="bg-img">
                    <img src="/Background-img.png" alt="Background" />
                </div>
            </div>

            {/* Right side form */}
            <div className="auth-form">
                <div className="form-box">
                    {/* Page title */}
                    {title || subtitle ? (
                        <div className="form-title">
                            <h1>{title}</h1>
                            {subtitle && <p>{subtitle}</p>}
                        </div>
                    ) : null}

                    {/* Main content */}
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
