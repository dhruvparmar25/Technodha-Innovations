// Forgot password page
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import AuthLayout from "../../../components/auth/AuthLayout";
import AlertBox from "../../../components/common/AlertBox";

// Validation
const ForgotSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email required"),
});

const ForgotPassword = () => {
    const navigate = useNavigate();

    // Alert state
    const [alert, setAlert] = useState({ type: "", message: "" });

    // Submit handler
    const handleSubmit = (values) => {
        // Save email for OTP page
        localStorage.setItem("forgot_email", values.email);

        setAlert({ type: "success", message: "OTP sent to your email" });

        navigate("/forgot/verify-otp");
    };

    return (
        <AuthLayout title="Reset Your Password" subtitle="Enter your email to get OTP">
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
                initialValues={{ email: "" }}
                validationSchema={ForgotSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        {/* Email */}
                        <div className="form-group">
                            <label>Email Address</label>
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

                        {/* Submit */}
                        <button type="submit" className="submit-button">
                            Send OTP
                        </button>

                        {/* Back */}
                        <button
                            type="button"
                            className="secondary-button"
                            onClick={() => navigate("/login")}
                        >
                            Back to Login
                        </button>
                    </form>
                )}
            </Formik>
        </AuthLayout>
    );
};

export default ForgotPassword;
