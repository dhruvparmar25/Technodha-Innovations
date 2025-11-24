import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import AuthLayout from "../../../components/auth/AuthLayout";
import AlertBox from "../../../components/common/AlertBox";
import api from "../../../api/axiosClient";
import { Formik } from "formik";
import * as yup from "yup";

const LoginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
});

const Login = () => {
    const navigate = useNavigate();

    // Alert
    const [alert, setAlert] = useState({ type: "", message: "" });

    // ⭐ Direct localStorage read (NO useEffect needed)
    const savedEmail = localStorage.getItem("remember_email") || "";
    const savedPassword = localStorage.getItem("remember_password") || "";

    // Password toggle
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword((p) => !p);

    // Submit handler
    const handleLoginSubmit = async (values, { setSubmitting }) => {
        try {
            const res = await api.post("/v1/users/login/", values);
            const user = res.data.data;

            // Store tokens + user
            localStorage.setItem("access_token", user.access_token);
            localStorage.setItem("refresh_token", user.refresh_token);
            localStorage.setItem("user", JSON.stringify(user));

            // ⭐ Remember Me Logic (email + password)
            if (values.rememberMe) {
                localStorage.setItem("remember_email", values.email);
                localStorage.setItem("remember_password", values.password);
            } else {
                localStorage.removeItem("remember_email");
                localStorage.removeItem("remember_password");
            }

            setAlert({ type: "success", message: res.data.detail || "Login Successful!" });
            setTimeout(() => navigate("/dashboard"), 2000);
        } catch (err) {
            setAlert({
                type: "error",
                message: err.response?.data?.detail || "Invalid email or password",
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

            <Formik
                initialValues={{
                    email: savedEmail,
                    password: savedPassword,
                    rememberMe: savedEmail || savedPassword ? true : false,
                }}
                enableReinitialize={true}
                validationSchema={LoginSchema}
                onSubmit={handleLoginSubmit}
            >
                {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
                    <form onSubmit={handleSubmit}>
                        {/* Email */}
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="text"
                                name="email"
                                className="form-input"
                                placeholder="Enter your email"
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
                                    placeholder="Enter your password"
                                    value={values.password}
                                    onChange={handleChange}
                                />

                                <button
                                    type="button"
                                    className="password-toggle-button"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                </button>
                            </div>

                            {errors.password && touched.password && (
                                <p className="validation-error">{errors.password}</p>
                            )}
                        </div>

                        {/* Options */}
                        <div className="form-options-row">
                            <div className="form-check-group">
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    name="rememberMe"
                                    className="form-check-input"
                                    checked={values.rememberMe}
                                    onChange={handleChange}
                                />
                                <label htmlFor="rememberMe" className="form-check-label">
                                    Remember me
                                </label>
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
