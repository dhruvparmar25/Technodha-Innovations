// Login page
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import AuthLayout from "../../../components/auth/AuthLayout";
import AlertBox from "../../../components/common/AlertBox";
import { Formik } from "formik";
import * as yup from "yup";
import { loginUser } from "../../../services/authService";

// Form validation
const LoginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email required"),
    password: yup.string().min(6, "Min 6 characters").required("Password required"),
});

const Login = () => {
    const navigate = useNavigate();

    // Alert state
    const [alert, setAlert] = useState({ type: "", message: "" });

    // Password visibility
    const [showPassword, setShowPassword] = useState(false);

    // Remember email only
    const savedEmail = localStorage.getItem("remember_email") || "";

    // Submit handler
    const handleLoginSubmit = async (values, { setSubmitting }) => {
        try {
            const res = await loginUser(values);
            const user = res.data?.data;

            // Save tokens
            localStorage.setItem("access_token", user.access_token);
            if (user.refresh_token) {
                localStorage.setItem("refresh_token", user.refresh_token);
            }

            // Save user info
            localStorage.setItem("user", JSON.stringify(user));

            // Save email if checked
            if (values.rememberMe) {
                localStorage.setItem("remember_email", values.email);
            } else {
                localStorage.removeItem("remember_email");
            }

            // Show message
            setAlert({ type: "success", message: "Login successful" });

            // Small delay before redirect
            setTimeout(() => {
                navigate("/dashboard");
            }, 1500);
        } catch (err) {
            // Show error
            setAlert({
                type: "error",
                message: err.response?.data?.detail || "Invalid credentials",
            });
        }

        setSubmitting(false);
    };

    return (
        <AuthLayout title="Welcome Back" subtitle="Login to continue">
            {/* Alert */}
            {alert.message && (
                <AlertBox
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert({ type: "", message: "" })}
                />
            )}

            {/* Form */}
            <Formik
                initialValues={{
                    email: savedEmail,
                    password: "",
                    rememberMe: !!savedEmail,
                }}
                validationSchema={LoginSchema}
                onSubmit={handleLoginSubmit}
            >
                {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
                    <form onSubmit={handleSubmit}>
                        {/* Email */}
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-input"
                                placeholder="Enter email"
                                value={values.email}
                                onChange={handleChange}
                            />
                            {errors.email && touched.email && (
                                <p className="validation-error">{errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="form-group password-group">
                            <label>Password</label>

                            <div className="input-with-icon-container">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className="form-input"
                                    placeholder="Enter password"
                                    value={values.password}
                                    onChange={handleChange}
                                />

                                {/* Toggle password */}
                                <button
                                    type="button"
                                    className="password-toggle-button"
                                    onClick={() => setShowPassword((p) => !p)}
                                >
                                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                </button>
                            </div>

                            {errors.password && touched.password && (
                                <p className="validation-error">{errors.password}</p>
                            )}
                        </div>

                        {/* Remember + Forgot */}
                        <div className="form-options-row">
                            <div className="form-check-group">
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    name="rememberMe"
                                    checked={values.rememberMe}
                                    onChange={handleChange}
                                />
                                <label htmlFor="rememberMe">Remember me</label>
                            </div>

                            <NavLink to="/forgot">Forgot password?</NavLink>
                        </div>

                        {/* Submit */}
                        <button type="submit" className="submit-button" disabled={isSubmitting}>
                            {isSubmitting ? "Logging in..." : "Login"}
                        </button>

                        <p className="toggel-btn">
                            Don't have an account? <NavLink to="/signup/step1">Signup</NavLink>
                        </p>
                    </form>
                )}
            </Formik>
        </AuthLayout>
    );
};

export default Login;
