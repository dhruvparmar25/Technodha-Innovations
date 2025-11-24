import React, { useRef, useState, useEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { NavLink, useNavigate, useParams, useLocation } from "react-router-dom";

import AuthLayout from "../../../components/auth/AuthLayout";
import AlertBox from "../../../components/common/AlertBox";
import { verifyOtp } from "../../../services/authService";

// OTP Validation
const OtpSchema = yup.object({
    otp: yup
        .string()
        .matches(/^[0-9]{6}$/, "Enter a valid 6-digit OTP")
        .required("OTP is required"),
});

const OtpVerification = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();

    const inputRefs = useRef([]);
    const [alert, setAlert] = useState({ type: "", message: "" });

    const isSignup = location.pathname.includes("/signup");
    const isForgot = location.pathname.includes("/forgot");

    useEffect(() => {
        const forgotEmail = localStorage.getItem("forgot_email");
        const signupEmail = localStorage.getItem("signup_email");

        if (isSignup) {
            setEmail(signupEmail || "");
        } else if (isForgot) {
            setEmail(forgotEmail || "");
        }
    }, [isSignup, isForgot]);

    useEffect(() => {
        if (isSignup && !id) {
            const saved = localStorage.getItem("signup_user_id");
            if (saved) navigate(`/signup/verify/${saved}`);
        }
    }, [id, isSignup, navigate]);

    const handleInputChange = (value, index, otp, setFieldValue) => {
        if (/^[0-9]?$/.test(value)) {
            const newOtp = otp.split("");
            newOtp[index] = value;
            const updated = newOtp.join("");

            setFieldValue("otp", updated);

            if (value && index < 5) inputRefs.current[index + 1].focus();
        }
    };

    const handleSubmitOtp = async (values) => {
        try {
            const otp = values.otp;

            if (isSignup) {
                if (!id) throw new Error("Invalid user ID");

                await verifyOtp(id, { otp });

                setAlert({ type: "success", message: "OTP Verified Successfully!" });
                setTimeout(() => navigate("/signup/step2"), 1200);
                return;
            }

            if (isForgot) {
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
                {({ values, errors, touched, handleSubmit, setFieldValue }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="otp-container">
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

                        {errors.otp && touched.otp && (
                            <p className="validation-error">{errors.otp}</p>
                        )}

                        <div className="resend-text">
                            Didn't receive the code?
                            <NavLink to="#" className="resend-link">
                                Resend OTP
                            </NavLink>
                        </div>

                        <button type="submit" className="submit-button">
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
