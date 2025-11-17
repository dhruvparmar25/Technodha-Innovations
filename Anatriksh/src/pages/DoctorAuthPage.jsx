// pages/DoctorAuthPage.jsx
import React, { useState } from "react";
// Import all components
import AuthLayout from "../components/AuthLayout";
import LoginForm from "../components/LoginForm";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import DoctorSignupForm from "../components/DoctorSignupForm"; // Step 2
import DoctorSignupStep1 from "../components/DoctorSignupStep1"; // Step 1

// Centralized validation helper
const validateEmail = (email) => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const DoctorAuthPage = () => {
    // --- Common States ---
    const [viewMode, setViewMode] = useState('login'); // 'login', 'forgotPassword', 'signupStep1', 'signupStep2'
    const [showPassword, setShowPassword] = useState({ create: false, confirm: false, login: false });

    // --- Login States ---
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    // --- Forgot Password States ---
    const [forgotEmail, setForgotEmail] = useState('');
    const [forgotErrors, setForgotErrors] = useState({});

    // --- Signup Step 1 States (Basic Details) ---
    const [signupStep1Data, setSignupStep1Data] = useState({
        email: '',
        createPassword: '',
        confirmPassword: ''
    });
    const [signupStep1Errors, setSignupStep1Errors] = useState({});

    // --- Signup Step 2 States (Professional Details) ---
    const [signupStep2Data, setSignupStep2Data] = useState({
        name: '',
        specialization: '',
        clinic: '',
        licenseNumber: '',
        contact: ''
    });
    const [signupStep2Errors, setSignupStep2Errors] = useState({});


    // --- Validation Logic ---
    const validateLoginForm = () => {
        let formErrors = {};
        let isValid = true;
        
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
        
        if (!forgotEmail.trim()) { formErrors.forgotEmail = "Email is required"; isValid = false; }
        else if (!validateEmail(forgotEmail)) { formErrors.forgotEmail = "Email address is invalid"; isValid = false; }
        setForgotErrors(formErrors);
        return isValid;
    };

    const validateSignupStep1 = () => {
        let formErrors = {};
        let isValid = true;
        const { email, createPassword, confirmPassword } = signupStep1Data;

        if (!email.trim()) { formErrors.email = "Email is required"; isValid = false; }
        else if (!validateEmail(email)) { formErrors.email = "Email address is invalid"; isValid = false; }
        
        if (!createPassword) { formErrors.createPassword = "Password is required"; isValid = false; }
        else if (createPassword.length < 6) { formErrors.createPassword = "Password must be at least 6 characters"; isValid = false; }

        if (!confirmPassword) { formErrors.confirmPassword = "Confirmation is required"; isValid = false; }
        else if (createPassword !== confirmPassword) { formErrors.confirmPassword = "Passwords do not match"; isValid = false; }
        
        setSignupStep1Errors(formErrors);
        return isValid;
    }
    
    const validateSignupStep2 = () => {
        let formErrors = {};
        let isValid = true;
        const data = signupStep2Data;

        if (!data.name.trim()) { formErrors.name = "Name is required"; isValid = false; }
        if (!data.specialization) { formErrors.specialization = "Specialization is required"; isValid = false; }
        if (!data.clinic.trim()) { formErrors.clinic = "Clinic/Hospital name is required"; isValid = false; }
        if (!data.licenseNumber.trim()) { formErrors.licenseNumber = "License number is required"; isValid = false; }
        if (!data.contact.trim() || data.contact.trim().length < 10) { formErrors.contact = "A valid contact number is required"; isValid = false; }
        
        setSignupStep2Errors(formErrors);
        return isValid;
    }
    
    // --- Handlers ---
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (validateLoginForm()) {
            console.log("Login Successful", { email, password });
            alert("Login Successful! (Simulated)");
        }
    };
    
    const handleForgotSubmit = (e) => {
        e.preventDefault();
        if (validateForgotForm()) {
            console.log("Forgot Password Request Sent", { forgotEmail });
            alert(`Password reset link sent to ${forgotEmail}! (Simulated)`);
        }
    };

    // Step 1: Change Handler
    const handleSignupStep1Change = (e) => {
        const { name, value } = e.target;
        setSignupStep1Data(prevData => ({ ...prevData, [name]: value }));
    }

    // Step 1: Submit Handler (Moves to Step 2)
    const handleSignupStep1Submit = (e) => {
        e.preventDefault();
        if (validateSignupStep1()) {
            setViewMode('signupStep2'); // Move to the next step
            setSignupStep1Errors({}); // Clear errors upon success
        }
    }

    // Step 2: Change Handler
    const handleSignupStep2Change = (e) => {
        const { name, value } = e.target;
        setSignupStep2Data(prevData => ({ ...prevData, [name]: value }));
    }

    // Step 2: Submit Handler (Final Submission)
    const handleSignupStep2Submit = (e) => {
        e.preventDefault();
        if (validateSignupStep2()) {
            console.log("Final Doctor Signup Data:", { 
                basic: signupStep1Data, 
                professional: signupStep2Data 
            });
            alert("Doctor Account Created Successfully! (Simulated)");
            // Clear all data and go back to login
            setSignupStep1Data({ email: '', createPassword: '', confirmPassword: '' });
            setSignupStep2Data({ name: '', specialization: '', clinic: '', licenseNumber: '', contact: '' });
            switchToLogin();
        }
    }
    
    // --- View Switchers ---
    const switchToForgot = () => {
        setViewMode('forgotPassword');
        setErrors({}); setSignupStep1Errors({}); setSignupStep2Errors({});
    };

    const switchToLogin = () => {
        setViewMode('login');
        setForgotErrors({}); setSignupStep1Errors({}); setSignupStep2Errors({});
    };

    const switchToSignupStep1 = (e) => {
        e.preventDefault(); // Prevent default link behavior
        setViewMode('signupStep1');
        setErrors({}); 
    }

    // FIX: This function is now correctly passed to and used by Step 2 component
    const switchToSignupStep1FromStep2 = () => {
        setViewMode('signupStep1');
        setSignupStep2Errors({}); // Clear step 2 errors if going back
    }
    
    const togglePasswordVisibility = (field) => {
        if (viewMode === 'login') {
             setShowPassword(prev => ({ ...prev, login: !prev.login }));
        } else if (viewMode === 'signupStep1') {
             setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
        }
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
                showPassword={showPassword.login}
                togglePasswordVisibility={() => togglePasswordVisibility('login')}
                switchToForgot={switchToForgot} 
                switchToSignup={switchToSignupStep1} 
            />
        );
    } else if (viewMode === 'signupStep1') {
    
        formContent = (
             <DoctorSignupStep1
                formData={signupStep1Data}
                errors={signupStep1Errors}
                handleChange={handleSignupStep1Change}
                handleSubmit={handleSignupStep1Submit}
                switchToLogin={switchToLogin}
                showPassword={showPassword}
                togglePasswordVisibility={togglePasswordVisibility}
            />
        );
    } else if( viewMode === 'signupStep2'){
        
        formContent = (
             <DoctorSignupForm
                formData={signupStep2Data}
                errors={signupStep2Errors}
                handleChange={handleSignupStep2Change}
                handleSubmit={handleSignupStep2Submit}
                switchToLogin={switchToLogin}
                // --- FIX APPLIED HERE ---
                switchToSignupStep1={switchToSignupStep1FromStep2} 
                // ------------------------
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
                switchToLogin={switchToLogin} 
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