// components/AuthLayout.jsx
import React from 'react';

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="auth">
      {/* Left Side: Fixed Image/Logo */}
      <div className="auth-img">
       <div className="logo">
        <img src="logo.png" alt="" />
       </div>

      </div>

      {/* Right Side: Dynamic Content */}
      <div className="auth-form">
        <div className="form-box">
          <div className="form-title">
            {/* Title and Subtitle passed via props */}
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          
          {/* Main Form Content passed as children */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;