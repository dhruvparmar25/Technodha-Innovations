import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/ui/AuthLayout";
import LoginForm from "../components/auth/LoginForm";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";
import DoctorSignupForm from "../components/auth/DoctorSignupForm";
import DoctorSignupStep1 from "../components/auth/DoctorSignupStep1";
import AlertBox from "../components/ui/AlertBox";

const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
const validateName = (name) => /^[A-Za-z ]{3,30}$/.test(name);
const validateLicense = (id) => /^[A-Z0-9-]{5,20}$/.test(id);
const validateContact = (num) => /^[0-9]{10}$/.test(num);

const DoctorAuthPage = ({ mode }) => {
  const navigate = useNavigate();
const viewMode = mode || "login";

  const [alert, setAlert] = useState({ type: "", message: "" });


  // --- Login States ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // --- Forgot Password ---
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotErrors, setForgotErrors] = useState({});

  // --- Signup Step 1 ---
  const [signupStep1Data, setSignupStep1Data] = useState({
    email: "",
    createPassword: "",
    confirmPassword: "",
  });
  const [signupStep1Errors, setSignupStep1Errors] = useState({});

  // --- Signup Step 2 ---
  const [signupStep2Data, setSignupStep2Data] = useState({
    name: "",
    specialization: "",
    clinic: "",
    licenseNumber: "",
    contact: "",
  });
  const [signupStep2Errors, setSignupStep2Errors] = useState({});

  const [showPassword, setShowPassword] = useState({
    create: false,
    confirm: false,
    login: false,
  });

  // -------------------------------
  // VALIDATIONS
  // -------------------------------

  const validateLoginForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!email.trim()) formErrors.email = "Email is required", (isValid = false);
    else if (!validateEmail(email)) formErrors.email = "Invalid email", (isValid = false);

    if (!password) formErrors.password = "Password required", (isValid = false);
    else if (password.length < 6)
      formErrors.password = "Min 6 characters", (isValid = false);

    setErrors(formErrors);
    return isValid;
  };

  const validateForgotForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!forgotEmail.trim())
      formErrors.forgotEmail = "Email required", (isValid = false);
    else if (!validateEmail(forgotEmail))
      formErrors.forgotEmail = "Invalid email", (isValid = false);

    setForgotErrors(formErrors);
    return isValid;
  };

  const validateSignupStep1 = () => {
    const { email, createPassword, confirmPassword } = signupStep1Data;
    let formErrors = {};
    let isValid = true;

    if (!validateEmail(email)) formErrors.email = "Invalid email", (isValid = false);

    if (!createPassword || createPassword.length < 6)
      formErrors.createPassword = "Min 6 characters", (isValid = false);

    if (confirmPassword !== createPassword)
      formErrors.confirmPassword = "Passwords must match", (isValid = false);

    setSignupStep1Errors(formErrors);
    return isValid;
  };

  const validateSignupStep2 = () => {
    const d = signupStep2Data;
    let formErrors = {};
    let isValid = true;

    if (!validateName(d.name)) formErrors.name = "Invalid name", (isValid = false);
    if (!d.specialization) formErrors.specialization = "Required", (isValid = false);
    if (!d.clinic.trim()) formErrors.clinic = "Required", (isValid = false);
    if (!validateLicense(d.licenseNumber))
      formErrors.licenseNumber = "Invalid license format", (isValid = false);
    if (!validateContact(d.contact))
      formErrors.contact = "Must be 10 digits", (isValid = false);

    setSignupStep2Errors(formErrors);
    return isValid;
  };

  // -------------------------------
  // SUBMIT HANDLERS
  // -------------------------------

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (validateLoginForm()) {
      setAlert({ type: "success", message: "Login Successful!" });
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (validateForgotForm()) {
      setAlert({ type: "success", message: "Reset link sent!" });
    }
  };

  const handleSignupStep1Submit = (e) => {
    e.preventDefault();
    if (validateSignupStep1()) {
      navigate("/signup/step2");
    }
  };

  const handleSignupStep2Submit = (e) => {
    e.preventDefault();
    if (validateSignupStep2()) {
      setAlert({ type: "success", message: "Doctor account created!" });

      setTimeout(() => navigate("/login"), 1000);
    }
  };

  // -------------------------------
  // VIEW MODE SWITCHERS
  // -------------------------------

  const switchToLogin = () => navigate("/login");
  const switchToSignup = () => navigate("/signup");
  const switchToForgot = () => navigate("/forgot");

  const switchToSignupStep1FromStep2 = () => navigate("/signup");

  // PASSWORD VISIBILITY
  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  let title = "";
  let subtitle = "";
  let formContent = <></>;

  // -------------------------------
  // RENDER FORMS BASED ON ROUTE
  // -------------------------------

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
        switchToSignupStep1={switchToSignupStep1FromStep2}
      />
    );
  }

  if (viewMode === "forgotPassword") {
    title = "Reset Your Password";
    subtitle =
      "Enter your registered email and we will send you a reset link.";

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
