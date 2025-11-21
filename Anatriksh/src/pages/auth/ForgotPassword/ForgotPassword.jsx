import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "Yup";

import AuthLayout from "../../../components/auth/AuthLayout";
import AlertBox from "../../../components/common/AlertBox";

const ForgotPassword = () => {
    const navigate = useNavigate();

    const [alert, setAlert] = useState({ type: "", message: "" });

    // Yup validation
    const ForgotSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email format").required("Email is required"),
    });

    const handleSubmit = (values) => {
        console.log("Forgot Email:", values);

        setAlert({ type: "success", message: "Reset link sent to your email!" });

        setTimeout(() => {
            navigate("/forgot/verify-otp");
        }, 1500);
    };

    return (
        <AuthLayout title="Reset Your Password" subtitle="Enter your email to receive reset OTP">
            {/* Alert */}
            {alert.message && (
                <AlertBox
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert({ type: "", message: "" })}
                />
            )}

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
                                placeholder="Enter your email"
                                value={values.email}
                                onChange={handleChange}
                            />
                            {errors.email && touched.email && (
                                <p className="validation-error">{errors.email}</p>
                            )}
                        </div>

                        <button type="submit" className="submit-button">
                            Send Reset Link
                        </button>

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
