import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";

import AuthLayout from "../../../components/auth/AuthLayout";
import AlertBox from "../../../components/common/AlertBox";

// Validation
const PasswordSchema = yup.object().shape({
    newPassword: yup
        .string()
        .min(6, "Password must be minimum 6 characters")
        .required("New password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("newPassword"), null], "Passwords do not match")
        .required("Confirm password is required"),
});

const CreateNewPassword = () => {
    const navigate = useNavigate();

    // Password visibility
    const [show, setShow] = useState({ new: false, confirm: false });
    const toggle = (field) => setShow((prev) => ({ ...prev, [field]: !prev[field] }));

    // Alert
    const [alert, setAlert] = useState({ type: "", message: "" });

    // Submit
    const handleSubmitPassword = (values) => {
        console.log("Password Reset Data:", values);

        setAlert({ type: "success", message: "Password Reset Successfully!" });

        setTimeout(() => navigate("/forgot/success"), 1500);
    };

    return (
        <AuthLayout
            title="Create New Password"
            subtitle="Set a strong password to protect your account."
        >
            {/* Alert */}
            {alert.message && (
                <AlertBox
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert({ type: "", message: "" })}
                />
            )}

            <Formik
                initialValues={{ newPassword: "", confirmPassword: "" }}
                validationSchema={PasswordSchema}
                onSubmit={handleSubmitPassword}
            >
                {({ values, errors, touched, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        {/* New Password */}
                        <div className="form-group password-group">
                            <label>New Password</label>
                            <div className="input-with-icon-container">
                                <input
                                    type={show.new ? "text" : "password"}
                                    className="form-input"
                                    name="newPassword"
                                    placeholder="Enter New Password"
                                    value={values.newPassword}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className="password-toggle-button"
                                    onClick={() => toggle("new")}
                                >
                                    {show.new ? <FaRegEyeSlash /> : <FaRegEye />}
                                </button>
                            </div>
                            {errors.newPassword && touched.newPassword && (
                                <p className="validation-error">{errors.newPassword}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="form-group password-group">
                            <label>Confirm Password</label>
                            <div className="input-with-icon-container">
                                <input
                                    type={show.confirm ? "text" : "password"}
                                    className="form-input"
                                    name="confirmPassword"
                                    placeholder="Re-enter New Password"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className="password-toggle-button"
                                    onClick={() => toggle("confirm")}
                                >
                                    {show.confirm ? <FaRegEyeSlash /> : <FaRegEye />}
                                </button>
                            </div>
                            {errors.confirmPassword && touched.confirmPassword && (
                                <p className="validation-error">{errors.confirmPassword}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="submit-button"
                            style={{ marginTop: "40px" }}
                        >
                            Reset Password
                        </button>
                    </form>
                )}
            </Formik>
        </AuthLayout>
    );
};

export default CreateNewPassword;
