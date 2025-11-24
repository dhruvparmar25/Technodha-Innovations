// Signup Step 1 (email + password)
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash, FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../../components/auth/AuthLayout";
import AlertBox from "../../../components/common/AlertBox";
import { Formik } from "formik";
import * as yup from "yup";
import { registerUser } from "../../../services/authService";

// Validation
const SignupStep1Schema = yup.object({
    email: yup.string().email("Invalid email").required("Required"),
    createPassword: yup.string().min(6, "Min 6 characters").required("Required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("createPassword")], "Passwords not same")
        .required("Required"),
});

const SignupStep1 = () => {
    const navigate = useNavigate();

    // Alert
    const [alert, setAlert] = useState({ type: "", message: "" });

    // Password visibility
    const [show, setShow] = useState({ create: false, confirm: false });

    // Submit handler
    const handleSubmitStep1 = async (values, { setSubmitting }) => {
        setAlert({});

        try {
            const payload = {
                email: values.email,
                password: values.createPassword,
                role: "doctor",
            };

            // API call
            const res = await registerUser(payload);

            const userId = res.data?.id;

            // Save needed data
            localStorage.setItem("signup_email", values.email);
            sessionStorage.setItem("signup_password", values.createPassword);
            localStorage.setItem("signup_user_id", userId);

            setAlert({ type: "success", message: "Account created. Verify OTP." });

            navigate(`/signup/verify/${userId}`);
        } catch (err) {
            // Show backend error
            setAlert({
                type: "error",
                message:
                    err.response?.data?.detail || err.response?.data?.message || "Signup failed",
            });
        }

        setSubmitting(false);
    };

    return (
        <AuthLayout>
            {/* Alert */}
            {alert.message && (
                <AlertBox type={alert.type} message={alert.message} onClose={() => setAlert({})} />
            )}

            {/* Form */}
            <Formik
                initialValues={{
                    email: "",
                    createPassword: "",
                    confirmPassword: "",
                }}
                validationSchema={SignupStep1Schema}
                onSubmit={handleSubmitStep1}
            >
                {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
                    <form onSubmit={handleSubmit}>
                        {/* Step header */}
                        <div className="step-indicator">
                            <div className="back-arrow" onClick={() => navigate("/login")}>
                                <FaAngleLeft size={20} color="#7C3AED" />
                            </div>
                            <p>Step 1 of 2 — Basic Details</p>
                            <div className="progress-bar-container">
                                <div className="progress-bar step-1"></div>
                            </div>
                        </div>

                        <div className="form-title">
                            <h1>Create Your Doctor Account</h1>
                            <p>Enter your email and password</p>
                        </div>

                        {/* Email */}
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                className="form-input"
                                name="email"
                                placeholder="Enter email"
                                value={values.email}
                                onChange={handleChange}
                            />
                            {errors.email && touched.email && (
                                <p className="validation-error">{errors.email}</p>
                            )}
                        </div>

                        {/* Create Password */}
                        <div className="form-group">
                            <label>Create Password</label>

                            <div className="input-with-icon-container">
                                <input
                                    type={show.create ? "text" : "password"}
                                    name="createPassword"
                                    className="form-input"
                                    placeholder="Enter password"
                                    value={values.createPassword}
                                    onChange={handleChange}
                                />
                                {/* Toggle */}
                                <button
                                    type="button"
                                    className="password-toggle-button"
                                    onClick={() => setShow((p) => ({ ...p, create: !p.create }))}
                                >
                                    {show.create ? <FaRegEyeSlash /> : <FaRegEye />}
                                </button>
                            </div>

                            {errors.createPassword && touched.createPassword && (
                                <p className="validation-error">{errors.createPassword}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="form-group">
                            <label>Confirm Password</label>

                            <div className="input-with-icon-container">
                                <input
                                    type={show.confirm ? "text" : "password"}
                                    name="confirmPassword"
                                    className="form-input"
                                    placeholder="Re-enter password"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                />
                                {/* Toggle */}
                                <button
                                    type="button"
                                    className="password-toggle-button"
                                    onClick={() => setShow((p) => ({ ...p, confirm: !p.confirm }))}
                                >
                                    {show.confirm ? <FaRegEyeSlash /> : <FaRegEye />}
                                </button>
                            </div>

                            {errors.confirmPassword && touched.confirmPassword && (
                                <p className="validation-error">{errors.confirmPassword}</p>
                            )}
                        </div>

                        {/* Submit */}
                        <button type="submit" className="submit-button" disabled={isSubmitting}>
                            Continue
                        </button>
                    </form>
                )}
            </Formik>
        </AuthLayout>
    );
};

export default SignupStep1;
