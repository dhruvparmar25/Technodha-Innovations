import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash, FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../../components/auth/AuthLayout";
import AlertBox from "../../../components/common/AlertBox";
import { Formik } from "formik";
import * as yup from "yup";
import { registerUser } from "../../../services/authService";

// Validation Schema
const SignupStep1Schema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    createPassword: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("createPassword")], "Passwords do not match")
        .required("Confirm your password"),
});

const SignupStep1 = () => {
    const navigate = useNavigate();
    const [alert, setAlert] = useState({ type: "", message: "" });

    // Password visibility toggle
    const [show, setShow] = useState({ create: false, confirm: false });
    const toggle = (field) => setShow((prev) => ({ ...prev, [field]: !prev[field] }));

    // Submit Step 1
    const handleSubmitStep1 = async (values) => {
        setAlert({ type: "", message: "" });

        try {
            const payload = {
                email: values.email,
                password: values.createPassword,
                role: "doctor",
            };

            const res = await registerUser(payload);
            const userId = res.data.id;

            // Save required data for OTP screen
            localStorage.setItem("signup_email", values.email);
            localStorage.setItem(
                "signupStep1",
                JSON.stringify({
                    email: values.email,
                    password: values.createPassword,
                })
            );
            localStorage.setItem("signup_user_id", userId);

            // Success alert
            setAlert({
                type: "success",
                message: res.data?.detail || "Account created! Verify OTP.",
            });

            setTimeout(() => navigate(`/signup/verify/${userId}`), 900);
        } catch (err) {
            // Backend error priority
            setAlert({
                type: "error",
                message:
                    err.response?.data?.detail ||
                    err.response?.data?.message ||
                    (Object.values(err.response?.data || {})[0] ?? null) ||
                    err.message ||
                    "Registration failed",
            });
        }
    };

    return (
        <AuthLayout>
            {/* Alert Notification */}
            {alert.message && (
                <AlertBox
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert({ type: "", message: "" })}
                />
            )}

            <Formik
                initialValues={{
                    email: "",
                    createPassword: "",
                    confirmPassword: "",
                }}
                validationSchema={SignupStep1Schema}
                onSubmit={handleSubmitStep1}
            >
                {({ values, errors, touched, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        {/* Step Header */}
                        <div className="step-indicator">
                            <div className="back-arrow" onClick={() => navigate("/login")}>
                                <FaAngleLeft size={20} color="#7C3AED" />
                            </div>
                            <p>Step 1 of 2 — Basic Details</p>

                            <div className="progress-bar-container">
                                <div className="progress-bar step-1"></div>
                            </div>
                        </div>

                        {/* Title */}
                        <div className="form-title">
                            <h1>Create Your Doctor Account</h1>
                            <p>Join our platform to connect with patients securely</p>
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
                                <button
                                    type="button"
                                    onClick={() => toggle("create")}
                                    className="password-toggle-button"
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
                                <button
                                    type="button"
                                    onClick={() => toggle("confirm")}
                                    className="password-toggle-button"
                                >
                                    {show.confirm ? <FaRegEyeSlash /> : <FaRegEye />}
                                </button>
                            </div>
                            {errors.confirmPassword && touched.confirmPassword && (
                                <p className="validation-error">{errors.confirmPassword}</p>
                            )}
                        </div>

                        {/* Submit */}
                        <button type="submit" className="submit-button">
                            Continue
                        </button>
                    </form>
                )}
            </Formik>
        </AuthLayout>
    );
};

export default SignupStep1;
