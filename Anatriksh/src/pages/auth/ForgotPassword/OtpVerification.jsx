import React, { useRef, useState } from "react";
import { Formik } from "formik";
import * as Yup from "Yup";
import { NavLink, useNavigate } from "react-router-dom";

import AuthLayout from "../../../components/auth/AuthLayout";
import AlertBox from "../../../components/common/AlertBox";

// Validation
const OtpSchema = Yup.object().shape({
    otp: Yup.string()
        .matches(/^[0-9]{6}$/, "Enter a valid 6-digit OTP")
        .required("OTP is required"),
});

const OtpVerification = () => {
    const navigate = useNavigate();
    const inputRefs = useRef([]);
    const [alert, setAlert] = useState({ type: "", message: "" });

    // Handle OTP typing
    const handleInputChange = (value, index, otp, setFieldValue) => {
        if (/^[0-9]?$/.test(value)) {
            const newOtp = otp.split("");
            newOtp[index] = value;
            const updatedOtp = newOtp.join("");

            setFieldValue("otp", updatedOtp);

            if (value && index < 5) inputRefs.current[index + 1].focus();
        }
    };

    // Submit
    const handleSubmit = (values) => {
        console.log("OTP Submitted:", values.otp);

        setAlert({ type: "success", message: "OTP Verified Successfully!" });

        setTimeout(() => navigate("/forgot/create-new-password"), 1500);
    };

    return (
        <AuthLayout
            title="Verify Your Email"
            subtitle="Enter the 6-digit OTP we’ve sent to your email:"
        >
            {/* Alert */}
            {alert.message && (
                <AlertBox
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert({ type: "", message: "" })}
                />
            )}

            <div className="email">
                <a href="#">doctor@example.com</a>
            </div>

            <Formik
                initialValues={{ otp: "" }}
                validationSchema={OtpSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, setFieldValue, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        {/* OTP Inputs */}
                        <div
                            style={{
                                display: "flex",
                                gap: "40px",
                                marginTop: "35px",
                                marginBottom: "12px",
                            }}
                        >
                            {[0, 1, 2, 3, 4, 5].map((index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    className="otp-box"
                                    value={values.otp[index] || ""}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    onChange={(e) =>
                                        handleInputChange(
                                            e.target.value,
                                            index,
                                            values.otp,
                                            setFieldValue
                                        )
                                    }
                                />
                            ))}
                        </div>

                        {/* Error */}
                        {errors.otp && touched.otp && (
                            <p className="validation-error" style={{ textAlign: "center" }}>
                                {errors.otp}
                            </p>
                        )}

                        <div style={{ marginTop: "10px", textAlign: "center" }}>
                            Didn’t receive the code?
                            <NavLink to="#" style={{ color: "var(--color-primary)" }}>
                                {" "}
                                Resend OTP
                            </NavLink>
                        </div>

                        <button
                            type="submit"
                            className="submit-button"
                            style={{ marginTop: "20px" }}
                        >
                            Verify OTP
                        </button>

                        <div className="secondary-button" style={{ textAlign: "center" }}>
                            <NavLink to="/login">Back to Login</NavLink>
                        </div>
                    </form>
                )}
            </Formik>
        </AuthLayout>
    );
};

export default OtpVerification;
