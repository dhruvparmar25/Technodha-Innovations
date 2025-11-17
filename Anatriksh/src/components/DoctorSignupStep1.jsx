import React from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const DoctorSignupStep1 = ({ 
    formData, 
    errors, 
    handleChange, 
    handleSubmit, 
    switchToLogin,
    showPassword,
    togglePasswordVisibility 
}) => {
    return (<>    
          <form onSubmit={handleSubmit}>
            <div className="step-indicator">
                <div className="back-arrow" onClick={switchToLogin}>
                    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#7C3AED' viewBox='0 0 16 16'><path fillRule='evenodd' d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'/></svg>
                </div>
                <p>Step 1 of 2 — Basic Details</p>
                <div className="progress-bar-container">
                     <div className="progress-bar step-1"></div>
                </div>
            </div>
<div className="form-title">
    <h1>Create Your Doctor Account</h1>
    <p>Join our platform to connect with patients securely+</p>
</div>
            {/* Email Input */}
            <div className="form-group">
                <label htmlFor="signupEmail" className="form-label">Email</label>
                <input
                    type="text"
                    className="form-input"
                    id="signupEmail"
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && (
                    <div className="validation-error">{errors.email}</div>
                )}
            </div>
            {/* Create Password Input */}
            <div className="form-group password-group">
                <label htmlFor="createPassword" className="form-label">Create Password</label>
                <div className="input-with-icon-container">
                    <input
                        type={showPassword.create ? "text" : "password"}
                        className="form-input"
                        id="createPassword"
                        placeholder="Enter Your Password"
                        name="createPassword"
                        value={formData.createPassword}
                        onChange={handleChange}
                    />
                    <button
                        type="button"
                        className="password-toggle-button"
                        onClick={() => togglePasswordVisibility('create')}
                    >
                        {showPassword.create ? <FaRegEyeSlash size={20} aria-label="Hide password" /> : <FaRegEye size={20} aria-label="Show password" />}
                    </button>
                </div>
                {errors.createPassword && (
                    <div className="validation-error">{errors.createPassword}</div>
                )}
            </div>

            {/* Confirm Password Input */}
            <div className="form-group password-group">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <div className="input-with-icon-container">
                    <input
                        type={showPassword.confirm ? "text" : "password"}
                        className="form-input"
                        id="confirmPassword"
                        placeholder="Re-enter Your Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    <button
                        type="button"
                        className="password-toggle-button"
                        onClick={() => togglePasswordVisibility('confirm')}
                    >
                        {showPassword.confirm ? <FaRegEyeSlash size={20} aria-label="Hide password" /> : <FaRegEye size={20} aria-label="Show password" />}
                    </button>
                </div>
                {errors.confirmPassword && (
                    <div className="validation-error">{errors.confirmPassword}</div>
                )}
            </div>

            {/* Continue Button */}
            <button type="submit" className="submit-button continue-button">
                Continue
            </button>

            {/* Already have an account? Login */}
            <div className="toggel-btn">
                Already have an account?
                <a href="#" className="signup-link" onClick={switchToLogin}>
                    Login
                </a>
            </div>
        </form></>

    );
};

export default DoctorSignupStep1;