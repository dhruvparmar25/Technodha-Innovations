// Create new password page
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import AuthLayout from "../../../components/auth/AuthLayout";
import AlertBox from "../../../components/common/AlertBox";

// Validation
const PasswordSchema = yup.object().shape({
    newPassword: yup.string().min(6, "Min 6 characters").required("Required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("newPassword")], "Passwords not same")
        .required("Required"),
});

const CreateNewPassword = () => {
    const navigate = useNavigate();

    // Show/hide password
    const [show, setShow] = useState({ new: false, confirm: false });

    // Alert
    const [alert, setAlert] = useState({ type: "", message: "" });

    // Submit handler
    const handleSubmitPassword = (values) => {
        // Call backend here (currently mock)
        console.log("New password:", values);

        setAlert({ type: "success", message: "Password updated" });

        navigate("/forgot/success");
    };

    return (
        <AuthLayout title="Create New Password" subtitle="Enter your new password">
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
                                    placeholder="New password"
                                    value={values.newPassword}
                                    onChange={handleChange}
                                />

                                {/* Toggle */}
                                <button
                                    type="button"
                                    className="password-toggle-button"
                                    onClick={() => setShow((p) => ({ ...p, new: !p.new }))}
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
                                    placeholder="Confirm password"
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
