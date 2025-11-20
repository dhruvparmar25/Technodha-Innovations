import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Layout
import AuthLayout from "../../components/auth/AuthLayout";

// Auth → Login
import LoginForm from "../../pages/auth/Login/LoginForm";

// Auth → Forgot Password
import ForgotPasswordForm from "../../pages/auth/ForgotPassword/ForgotPasswordForm";
import CreateNewPassword from "../../pages/auth/ForgotPassword/CreateNewPassword";

// Auth → Signup
import DoctorSignupForm from "../../pages/auth/Signup/DoctorSignupForm";
import DoctorSignupStep1 from "../../pages/auth/Signup/DoctorSignupStep1";
import DoctorSignupSuccess from "../../pages/auth/Signup/DoctorSignupSuccess";

// Common Components
import AlertBox from "../../components/common/AlertBox";

// API
import api from "../../api/axiosClient";
import PasswordChangeSuccess from "../auth/ForgotPassword/PasswordChangeSuccess";

// ------------------------------
// VALIDATION HELPERS
// ------------------------------
const validateEmail = (email) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
const validateName = (name) => /^[A-Za-z ]{3,30}$/.test(name);
const validateLicense = (id) => /^[A-Z0-9-]{5,20}$/.test(id);
const validateContact = (num) => /^[0-9]{10}$/.test(num);

const DoctorAuthPage = ({ mode }) => {
  const navigate = useNavigate();
  const viewMode = mode || "login";

  const [alert, setAlert] = useState({ type: "", message: "" });

  // ------------------------------
  // LOGIN STATES
  // ------------------------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // ------------------------------
  // FORGOT PASSWORD STATES
  // ------------------------------
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotErrors, setForgotErrors] = useState({});

  // ------------------------------
  // SIGNUP STEP 1
  // ------------------------------
  const [signupStep1Data, setSignupStep1Data] = useState({
    email: "",
    createPassword: "",
    confirmPassword: "",
  });
  const [signupStep1Errors, setSignupStep1Errors] = useState({});

  // ------------------------------
  // SIGNUP STEP 2
  // ------------------------------
  const [signupStep2Data, setSignupStep2Data] = useState({
    name: "",
    specialization: "",
    clinic: "",
    licenseNumber: "",
    contact: "",
  });
  const [signupStep2Errors, setSignupStep2Errors] = useState({});

  // ------------------------------
  // CREATE NEW PASSWORD
  // ------------------------------
  const [changePassword, setChangePassword] = useState({
    newPassword: "",
    newconfirmPassword: "",
  });
  const [changePasswordErrors, setChangePasswordErrors] = useState({});

  // ------------------------------
  // SHOW PASSWORD STATES
  // ------------------------------
  const [showPassword, setShowPassword] = useState({
    create: false,
    confirm: false,
    login: false,
  });

  // ------------------------------
  // VALIDATIONS
  // ------------------------------

  const validateLoginForm = () => {
    let formErrors = {};
    let valid = true;

    if (!email.trim()) (formErrors.email = "Email is required"), (valid = false);
    else if (!validateEmail(email))
      (formErrors.email = "Invalid email"), (valid = false);

    if (!password.trim())
      (formErrors.password = "Password required"), (valid = false);
    else if (password.length < 6)
      (formErrors.password = "Min 6 characters"), (valid = false);

    setErrors(formErrors);
    return valid;
  };

  const validateForgotForm = () => {
    let formErrors = {};
    let valid = true;

    if (!forgotEmail.trim())
      (formErrors.forgotEmail = "Email required"), (valid = false);
    else if (!validateEmail(forgotEmail))
      (formErrors.forgotEmail = "Invalid email"), (valid = false);

    setForgotErrors(formErrors);
    return valid;
  };

  const validateSignupStep1 = () => {
    const { email, createPassword, confirmPassword } = signupStep1Data;
    let formErrors = {};
    let valid = true;

    if (!validateEmail(email))
      (formErrors.email = "Invalid email"), (valid = false);

    if (!createPassword || createPassword.length < 6)
      (formErrors.createPassword = "Min 6 characters"), (valid = false);

    if (confirmPassword !== createPassword)
      (formErrors.confirmPassword = "Passwords must match"), (valid = false);

    setSignupStep1Errors(formErrors);
    return valid;
  };

  const validateSignupStep2 = () => {
    let d = signupStep2Data;
    let formErrors = {};
    let valid = true;

    if (!validateName(d.name))
      (formErrors.name = "Invalid name"), (valid = false);

    if (!d.specialization)
      (formErrors.specialization = "Required"), (valid = false);

    if (!d.clinic.trim())
      (formErrors.clinic = "Required"), (valid = false);

    if (!validateLicense(d.licenseNumber))
      (formErrors.licenseNumber = "Invalid license"), (valid = false);

    if (!validateContact(d.contact))
      (formErrors.contact = "Must be 10 digits"), (valid = false);

    setSignupStep2Errors(formErrors);
    return valid;
  };

  const validateChangePassword = () => {
    const { newPassword, newconfirmPassword } = changePassword;
    let formErrors = {};
    let valid = true;

    if (!newPassword || newPassword.length < 6)
      (formErrors.newPassword = "Min 6 characters"), (valid = false);

    if (newconfirmPassword !== newPassword)
      (formErrors.newconfirmPassword = "Passwords must match"), (valid = false);

    setChangePasswordErrors(formErrors);
    return valid;
  };

  // ------------------------------
  // SUBMIT HANDLERS
  // ------------------------------

  // const handleLoginSubmit = (e) => {
  //   e.preventDefault();
  //   if (validateLoginForm()) {
  //     setAlert({ type: "success", message: "Login Successful!" });
  //   }
  // };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (validateForgotForm()) {
      setAlert({ type: "success", message: "Reset Link Sent!" });
      navigate("/forgot/verify-otp");
    }
  };

const handleLoginSubmit = async (e) => {
  e.preventDefault();
  if (!validateLoginForm()) return;

  try {
    const res = await api.post("/users/login/", {
      email,
      password,
    });

    const user = res.data.data;

    // Save Tokens
    localStorage.setItem("access_token", user.access_token);
    localStorage.setItem("refresh_token", user.refresh_token);

    // Save Basic User Data
    localStorage.setItem("user", JSON.stringify({
      id: user.id,
      email: user.email,
      role: user.role,
    }));

  setAlert({ type: "success", message: "Login Successful!" });

setTimeout(() => {
  navigate("/dashboard");
}, 1000);


  } catch (error) {
    setAlert({
      type: "error",
      message: error.response?.data?.detail || "Invalid email or password",
    });
  }
};


  const handleSignupStep1Submit = (e) => {
    e.preventDefault();
    if (validateSignupStep1()) navigate("/signup/step2");
  };

  const handleSignupStep2Submit = (e) => {
    e.preventDefault();
    if (validateSignupStep2()) {
      setAlert({ type: "success", message: "Doctor account created!" });
      navigate("/signup/success");
    }
  };

  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    if (validateChangePassword()) {
      setAlert({ type: "success", message: "Password Reset Successfully!" });
      navigate("/forgot/success");
    }
  };

  // ------------------------------
  // VIEW MODE SWITCHERS
  // ------------------------------

  const switchToLogin = () => navigate("/login");
  const switchToSignup = () => navigate("/signup");
  const switchToForgot = () => navigate("/forgot");

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // ------------------------------
  // PAGE CONTENT BASED ON MODE
  // ------------------------------
  let title = "";
  let subtitle = "";
  let formContent = <></>;

  if (viewMode === "login") {
    title = "Welcome Back, Doctor";
    subtitle =
      "Log in to your HealthConnect account to manage appointments, patients, and reports.";

    formContent = (
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        errors={errors}
        handleSubmit={handleLoginSubmit}
        showPassword={showPassword.login}
        togglePasswordVisibility={() => togglePasswordVisibility("login")}
        switchToForgot={switchToForgot}
        switchToSignup={switchToSignup}
      />
    );
  }

  if (viewMode === "forgotPassword") {
    title = "Reset Your Password";
    subtitle = "Enter your registered email and we’ll send you a reset link.";

    formContent = (
      <ForgotPasswordForm
        forgotEmail={forgotEmail}
        setForgotEmail={setForgotEmail}
        forgotErrors={forgotErrors}
        handleSubmit={handleForgotSubmit}
        switchToLogin={switchToLogin}
          setForgotErrors={setForgotErrors}  // ✔ नया required prop

      />
    );
  }

  if (viewMode === "createNewPassword") {
    title = "Create New Password";
    subtitle = "Set a strong password to protect your account.";

    formContent = (
      <CreateNewPassword
        changePassword={changePassword}
        setChangePassword={setChangePassword}
        errors={changePasswordErrors}
        handleSubmit={handleChangePasswordSubmit}
        showPassword={showPassword}
        togglePasswordVisibility={togglePasswordVisibility}
           setErrors={setErrors}   // <-- this was missing

      />
    );
  }

  if (viewMode === "signupStep1") {
    formContent = (
      <DoctorSignupStep1
        formData={signupStep1Data}
        errors={signupStep1Errors}
        handleChange={(e) =>
          setSignupStep1Data({
            ...signupStep1Data,
            [e.target.name]: e.target.value,
          })
        }
        handleSubmit={handleSignupStep1Submit}
        switchToLogin={switchToLogin}
        showPassword={showPassword}
        togglePasswordVisibility={togglePasswordVisibility}
      />
    );
  }

  if (viewMode === "signupStep2") {
    formContent = (
      <DoctorSignupForm
        formData={signupStep2Data}
        errors={signupStep2Errors}
        handleChange={(e) =>
          setSignupStep2Data({
            ...signupStep2Data,
            [e.target.name]: e.target.value,
          })
        }
        handleSubmit={handleSignupStep2Submit}
        switchToLogin={switchToLogin}
        switchToSignupStep1={() => navigate("/signup")}
      />
    );
  }

  if (viewMode === "signupSuccess") {
    formContent = <DoctorSignupSuccess />;
  }
if (viewMode === "passwordSuccess") {
    formContent = <PasswordChangeSuccess />;
  }
  return (
    <AuthLayout title={title} subtitle={subtitle}>
      <AlertBox
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ type: "", message: "" })}
      />

      {formContent}
    </AuthLayout>
  );
};

export default DoctorAuthPage;
