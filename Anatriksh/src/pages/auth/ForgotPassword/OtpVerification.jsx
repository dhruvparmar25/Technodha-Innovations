import React, { useRef, useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "Yup";
import { NavLink, useNavigate, useParams, useLocation } from "react-router-dom";

import AuthLayout from "../../../components/auth/AuthLayout";
import AlertBox from "../../../components/common/AlertBox";
import { verifyOtp } from "../../../services/authService";

// Validation
const OtpSchema = Yup.object().shape({
    otp: Yup.string()
        .matches(/^[0-9]{6}$/, "Enter a valid 6-digit OTP")
        .required("OTP is required"),
});

const OtpVerification = () => {
    const [email, setEmail] = useState("");

    useEffect(() => {
        const forgotEmail = localStorage.getItem("forgot_email");
        const signupEmail = localStorage.getItem("signup_email");
        setEmail(forgotEmail || signupEmail || "");
    }, []);

    const navigate = useNavigate();
    const { id } = useParams(); // only for signup
    const location = useLocation();

    const inputRefs = useRef([]);
    const [alert, setAlert] = useState({ type: "", message: "" });

    // Mode detection
    const isSignup = location.pathname.includes("/signup");
    const isForgot = location.pathname.includes("/forgot");

    // For signup: ensure ID exists
    useEffect(() => {
        if (isSignup && !id) {
            const saved = localStorage.getItem("signup_user_id");
            if (saved) navigate(`/signup/verify/${saved}`);
        }
    }, [id, isSignup, navigate]);

    // Handle OTP input box logic
    const handleInputChange = (value, index, otp, setFieldValue) => {
        if (/^[0-9]?$/.test(value)) {
            const newOtp = otp.split("");
            newOtp[index] = value;
            const updatedOtp = newOtp.join("");

            setFieldValue("otp", updatedOtp);

            if (value && index < 5) inputRefs.current[index + 1].focus();
        }
    };

    // Submit OTP
    const handleSubmitOtp = async (values) => {
        try {
            const otp = values.otp;

            // ===== SIGNUP OTP VERIFY =====
            if (isSignup) {
                if (!id) throw new Error("Invalid user ID");

                await verifyOtp(id, { otp });

                setAlert({ type: "success", message: "OTP Verified Successfully!" });

                setTimeout(() => navigate("/signup/step2"), 1200);
                return;
            }

            // ===== FORGOT PASSWORD OTP VERIFY =====
            if (isForgot) {
                // TODO: use your forgot-password API here later
                setAlert({ type: "success", message: "OTP Verified Successfully!" });

                setTimeout(() => navigate("/forgot/create-new-password"), 1200);
                return;
            }
        } catch (err) {
            setAlert({
                type: "error",
                message:
                    err.response?.data?.detail ||
                    err.response?.data?.message ||
                    "OTP verification failed",
            });
        }
    };

    return (
        <AuthLayout
            title={isSignup ? "Verify Your Email" : "Verify OTP"}
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
                <a href="#">{email}</a>
            </div>

            <Formik
                initialValues={{ otp: "" }}
                validationSchema={OtpSchema}
                onSubmit={handleSubmitOtp}
            >
                {({ values, errors, touched, handleSubmit, setFieldValue }) => (
                    <form onSubmit={handleSubmit}>
                        {/* OTP input boxes */}
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

                        {/* Error text */}
                        {errors.otp && touched.otp && (
                            <p className="validation-error" style={{ textAlign: "center" }}>
                                {errors.otp}
                            </p>
                        )}

                        <div style={{ marginTop: "10px", textAlign: "center" }}>
                            Didn't receive the code?
                            <NavLink to="#" style={{ color: "var(--color-primary)" }}>
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
