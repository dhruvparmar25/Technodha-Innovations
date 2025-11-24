import React, { useEffect, useRef, useState, useCallback } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { NavLink, useNavigate, useParams, useLocation } from "react-router-dom";
import AuthLayout from "../../../components/auth/AuthLayout";
import AlertBox from "../../../components/common/AlertBox";
import { verifyOtp } from "../../../services/authService";

const OtpSchema = yup.object({
    otp: yup
        .string()
        .matches(/^[0-9]{6}$/, "Enter a valid 6-digit OTP")
        .required("OTP is required"),
});

const OtpVerification = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();

    const isSignup = location.pathname.includes("/signup");
    const isForgot = location.pathname.includes("/forgot");

    // Display email from storage
    const [email, setEmail] = useState("");
    const [alert, setAlert] = useState({ type: "", message: "" });

    // OTP digits stored as array
    const [otpArray, setOtpArray] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);

    const combinedOtp = otpArray.join("");

    // Load email depending on flow (signup or forgot)
    useEffect(() => {
        const forgotEmail = localStorage.getItem("forgot_email");
        const signupEmail = localStorage.getItem("signup_email");

        if (isSignup) setEmail(signupEmail || "");
        else if (isForgot) setEmail(forgotEmail || "");
    }, [isSignup, isForgot]);

    // If signup, ensure ID exists
    useEffect(() => {
        if (isSignup && !id) {
            const saved = localStorage.getItem("signup_user_id");
            if (saved) navigate(`/signup/verify/${saved}`);
        }
    }, [id, isSignup, navigate]);

    // Focus a specific OTP input box
    const focusInput = (i) => {
        const el = inputRefs.current[i];
        if (el) el.focus();
    };

    // Handle OTP box input (only digits allowed)
    const handleChange = (value, index) => {
        if (!/^[0-9]?$/.test(value)) return;

        const copy = [...otpArray];
        copy[index] = value;
        setOtpArray(copy);

        // Auto-move to next box if value exists
        if (value && index < 5) focusInput(index + 1);
    };

    // Handle keyboard events
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            if (otpArray[index]) {
                const copy = [...otpArray];
                copy[index] = "";
                setOtpArray(copy);
            } else if (index > 0) {
                const prev = index - 1;
                const copy = [...otpArray];
                copy[prev] = "";
                setOtpArray(copy);
                focusInput(prev);
            }
        }

        if (e.key === "ArrowLeft" && index > 0) focusInput(index - 1);
        if (e.key === "ArrowRight" && index < 5) focusInput(index + 1);
    };

    /**
     * Main Submit Logic — useCallback prevents ESLint warnings
     * and makes function stable for useEffect dependencies.
     */
    const handleSubmitOtp = useCallback(
        async (values) => {
            try {
                const otp = values.otp || combinedOtp;
                if (!/^[0-9]{6}$/.test(otp)) throw new Error("Invalid OTP");

                // Signup flow → verify & go to Step 2
                if (isSignup) {
                    const userId = id || localStorage.getItem("signup_user_id");
                    if (!userId) throw new Error("Invalid user ID");

                    await verifyOtp(userId, { otp });

                    setAlert({ type: "success", message: "OTP Verified Successfully!" });

                    setTimeout(() => navigate("/signup/step2"), 900);
                    return;
                }

                // Forgot password flow → navigate to new password screen
                if (isForgot) {
                    setAlert({ type: "success", message: "OTP Verified Successfully!" });

                    setTimeout(() => navigate("/forgot/create-new-password"), 900);
                    return;
                }
            } catch (err) {
                setAlert({
                    type: "error",
                    message:
                        err.response?.data?.detail ||
                        err.response?.data?.message ||
                        err.message ||
                        "OTP verification failed",
                });
            }
        },
        [combinedOtp, isSignup, isForgot, id, navigate]
    );

    // Auto-submit OTP when all digits filled
    useEffect(() => {
        if (combinedOtp.length === 6 && /^[0-9]{6}$/.test(combinedOtp)) {
            const timer = setTimeout(() => {
                handleSubmitOtp({ otp: combinedOtp });
            }, 120);

            return () => clearTimeout(timer);
        }
    }, [combinedOtp, handleSubmitOtp]);

    return (
        <AuthLayout
            title={isSignup ? "Verify Your Email" : "Verify OTP"}
            subtitle="Enter the 6-digit OTP sent to your email:"
        >
            {alert.message && (
                <AlertBox
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert({ type: "", message: "" })}
                />
            )}

            <div className="email-display">
                <a href="#">{email}</a>
            </div>

            <Formik
                initialValues={{ otp: "" }}
                validationSchema={OtpSchema}
                onSubmit={handleSubmitOtp}
            >
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        {/* OTP Input Boxes */}
                        <div className="otp-container">
                            {otpArray.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    className="otp-box"
                                    value={digit}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    onChange={(e) => handleChange(e.target.value, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                />
                            ))}
                        </div>

                        {/* Manual validation message (only visible if user clicks Verify manually) */}
                        {combinedOtp.length !== 6 && (
                            <p className="validation-error">Please enter 6 digits</p>
                        )}

                        {/* Resend */}
                        <div className="resend-text">
                            Didn't receive the code?
                            <NavLink to="#" className="resend-link">
                                Resend OTP
                            </NavLink>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="submit-button"
                            disabled={combinedOtp.length !== 6}
                        >
                            Verify OTP
                        </button>

                        <div className="back-login">
                            <NavLink to="/login">Back to Login</NavLink>
                        </div>
                    </form>
                )}
            </Formik>
        </AuthLayout>
    );
};

export default OtpVerification;
