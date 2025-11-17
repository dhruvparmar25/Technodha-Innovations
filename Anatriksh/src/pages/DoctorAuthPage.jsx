// pages/DoctorAuthPage.jsx
import React, { useState } from "react";
// Import all components
import AuthLayout from "../components/AuthLayout";
import LoginForm from "../components/LoginForm";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

// Centralized validation helper (can be moved to a utility file)
const validateEmail = (email) => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const DoctorAuthPage = () => {
    // --- Common States ---
    const [viewMode, setViewMode] = useState('login'); // 'login' or 'forgotPassword'
    const [showPassword, setShowPassword] = useState(false);

    // --- Login States ---
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    // --- Forgot Password States ---
    const [forgotEmail, setForgotEmail] = useState('');
    const [forgotErrors, setForgotErrors] = useState({});

    // --- Validation Logic ---
    const validateLoginForm = () => {
        let formErrors = {};
        let isValid = true;
        // ... validation logic ...
        if (!email.trim()) { formErrors.email = "Email is required"; isValid = false; }
        else if (!validateEmail(email)) { formErrors.email = "Email address is invalid"; isValid = false; }
        if (!password) { formErrors.password = "Password is required"; isValid = false; }
        else if (password.length < 6) { formErrors.password = "Password must be at least 6 characters"; isValid = false; }
        setErrors(formErrors);
        return isValid;
    };
    
    const validateForgotForm = () => {
        let formErrors = {};
        let isValid = true;
        // ... validation logic ...
        if (!forgotEmail.trim()) { formErrors.forgotEmail = "Email is required"; isValid = false; }
        else if (!validateEmail(forgotEmail)) { formErrors.forgotEmail = "Email address is invalid"; isValid = false; }
        setForgotErrors(formErrors);
        return isValid;
    };

    // --- Submission Handlers ---
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (validateLoginForm()) {
            console.log("Login Successful", { email, password });
            alert("Login Successful! (Simulated)");
        } else {
            console.log("Login validation failed");
        }
    };
    
    const handleForgotSubmit = (e) => {
        e.preventDefault();
        if (validateForgotForm()) {
            console.log("Forgot Password Request Sent", { forgotEmail });
            alert(`Password reset link sent to ${forgotEmail}! (Simulated)`);
        } else {
            console.log("Forgot password validation failed");
        }
    };
    
    // --- View Switchers ---
    const switchToForgot = () => {
        setViewMode('forgotPassword');
        setErrors({}); // Clear login errors when switching
    };
    const switchToLogin = () => {
        setViewMode('login');
        setForgotErrors({}); // Clear forgot errors when switching
    };
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // --- Conditional Content (Props) ---
    let title = "";
    let subtitle = "";
    let formContent;

    if (viewMode === 'login') {
        title = "Welcome Back, Doctor";
        subtitle = "Log in to your HealthConnect account to manage appointments, patients, and reports.";
        formContent = (
            <LoginForm 
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                errors={errors}
                handleSubmit={handleLoginSubmit}
                showPassword={showPassword}
                togglePasswordVisibility={togglePasswordVisibility}
                switchToForgot={switchToForgot} // Pass the view switcher
            />
        );
    } else if( viewMode === 'forgotPassword'){ 
        title = "Reset Your Password";
        subtitle = "Enter the email address associated with your account and we will send you a link to reset your password.";
        formContent = (
            <ForgotPasswordForm 
                forgotEmail={forgotEmail}
                setForgotEmail={setForgotEmail}
                forgotErrors={forgotErrors}
                handleSubmit={handleForgotSubmit}
                switchToLogin={switchToLogin} // Pass the view switcher
            />
        );
    }

    // --- Final Render ---
    return (
        <AuthLayout title={title} subtitle={subtitle}>
            {formContent}
        </AuthLayout>
    );
};

export default DoctorAuthPage;