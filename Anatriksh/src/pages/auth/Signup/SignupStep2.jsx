// Signup Step 2 (doctor profile)
import React, { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../../components/auth/AuthLayout";
import AlertBox from "../../../components/common/AlertBox";
import { Formik } from "formik";
import * as yup from "yup";
import Select from "react-select";
import { loginUser, createDoctor } from "../../../services/authService";
import { specializationOptions } from "../../../data/specializations";

// Validation
const Step2Schema = yup.object().shape({
    name: yup.string().required("Required"),
    specialization: yup.string().required("Required"),
    clinic: yup.string().required("Required"),
    licenseNumber: yup.string().nullable(),
    contact: yup
        .string()
        .matches(/^[0-9]{10}$/, "Invalid number")
        .required("Required"),
});

const SignupStep2 = () => {
    const navigate = useNavigate();

    // Load signup step1 data once (fixed)
    const savedEmail = localStorage.getItem("signup_email") || "";
    const savedPassword = sessionStorage.getItem("signup_password") || "";

    // Initial state (safe, no useEffect)
    const [step1Data] = useState({
        email: savedEmail,
        password: savedPassword,
    });

    // Alert + loading
    const [alert, setAlert] = useState({ type: "", message: "" });
    const [loading, setLoading] = useState(false);

    // Submit handler
    const handleSubmit = async (values, { setSubmitting }) => {
        setAlert({});

        // Check missing step1 data
        if (!step1Data.email || !step1Data.password) {
            setAlert({ type: "error", message: "Step 1 missing. Start signup again." });
            setSubmitting(false);
            return;
        }

        try {
            setLoading(true);

            // Login to get tokens
            const loginRes = await loginUser({
                email: step1Data.email,
                password: step1Data.password,
            });

            const user = loginRes.data?.data;

            // Save tokens
            localStorage.setItem("access_token", user.access_token);
            if (user.refresh_token) {
                localStorage.setItem("refresh_token", user.refresh_token);
            }

            // Save basic user info
            localStorage.setItem(
                "user",
                JSON.stringify({
                    id: user.id,
                    email: user.email,
                    role: user.role,
                })
            );

            // Doctor profile payload
            const payload = {
                name: values.name,
                specialty: values.specialization,
                contact_number: values.contact,
                hospital: values.clinic,
                license_number: values.licenseNumber || null,
            };

            // Create profile
            await createDoctor(payload);

            setAlert({ type: "success", message: "Profile created" });

            // Remove temp password
            sessionStorage.removeItem("signup_password");

            navigate("/signup/success");
        } catch (err) {
            setAlert({
                type: "error",
                message:
                    err.response?.data?.detail ||
                    err.response?.data?.message ||
                    "Something went wrong",
            });
        }

        setLoading(false);
        setSubmitting(false);
    };

    return (
        <AuthLayout>
            {/* Alert */}
            {alert.message && (
                <AlertBox type={alert.type} message={alert.message} onClose={() => setAlert({})} />
            )}

            {/* Header */}
            <div className="step-indicator">
                <div className="back-arrow" onClick={() => navigate("/signup/step1")}>
                    <FaAngleLeft size={20} color="#7C3AED" />
                </div>
                <p>Step 2 of 2 — Professional Details</p>
                <div className="progress-bar-container">
                    <div className="progress-bar step-2"></div>
                </div>
            </div>

            <div className="form-title">
                <h1>Create Your Doctor Account</h1>
                <p>Enter your professional details</p>
            </div>

            {/* Form */}
            <Formik
                initialValues={{
                    name: "",
                    specialization: "",
                    clinic: "",
                    licenseNumber: "",
                    contact: "",
                }}
                validationSchema={Step2Schema}
                onSubmit={handleSubmit}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit}>
                        {/* Name */}
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                className="form-input"
                                name="name"
                                placeholder="Enter name"
                                value={values.name}
                                onChange={handleChange}
                            />
                            {errors.name && touched.name && (
                                <p className="validation-error">{errors.name}</p>
                            )}
                        </div>

                        {/* Specialization */}
                        <div className="form-group">
                            <label>Specialization</label>
                            <Select
                                className="react-select-container"
                                classNamePrefix="react-select"
                                options={specializationOptions}
                                placeholder="Select specialization"
                                onChange={(opt) =>
                                    setFieldValue("specialization", opt?.value || "")
                                }
                            />
                            {errors.specialization && touched.specialization && (
                                <p className="validation-error">{errors.specialization}</p>
                            )}
                        </div>

                        {/* Clinic */}
                        <div className="form-group">
                            <label>Clinic / Hospital</label>
                            <input
                                className="form-input"
                                name="clinic"
                                placeholder="Enter clinic"
                                value={values.clinic}
                                onChange={handleChange}
                            />
                            {errors.clinic && touched.clinic && (
                                <p className="validation-error">{errors.clinic}</p>
                            )}
                        </div>

                        {/* License */}
                        <div className="form-group">
                            <label>License Number (Optional)</label>
                            <input
                                className="form-input"
                                name="licenseNumber"
                                placeholder="Enter license"
                                value={values.licenseNumber}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Contact */}
                        <div className="form-group">
                            <label>Contact</label>
                            <input
                                className="form-input"
                                name="contact"
                                placeholder="10-digit mobile"
                                value={values.contact}
                                onChange={handleChange}
                            />
                            {errors.contact && touched.contact && (
                                <p className="validation-error">{errors.contact}</p>
                            )}
                        </div>

                        {/* Save */}
                        <button
                            type="submit"
                            className="submit-button"
                            disabled={loading || isSubmitting}
                        >
                            {loading ? "Saving..." : "Save Profile"}
                        </button>
                    </form>
                )}
            </Formik>
        </AuthLayout>
    );
};

export default SignupStep2;
