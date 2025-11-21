import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash, FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../../components/auth/AuthLayout";
import AlertBox from "../../../components/common/AlertBox";
import { Formik } from "formik";
import * as Yup from "yup";

// ------------------------------
// Yup Validation Schema
// ------------------------------
const SignupStep1Schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  createPassword: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("createPassword")], "Passwords do not match")
    .required("Confirm your password"),
});

const SignupStep1 = () => {
  const navigate = useNavigate();

  // AlertBox state
  const [alert, setAlert] = useState({ type: "", message: "" });

  // Password visibility
  const [show, setShow] = useState({
    create: false,
    confirm: false,
  });

  const toggle = (f) => setShow((p) => ({ ...p, [f]: !p[f] }));

  const handleSubmitStep1 = (values) => {
    // Save to localStorage
    localStorage.setItem("signupStep1", JSON.stringify(values));

    setAlert({ type: "success", message: "Step 1 completed!" });

    setTimeout(() => navigate("/signup/step2"), 1200);
  };

  return (
    <AuthLayout>

      {/* ALERT BOX */}
      {alert.message && (
        <AlertBox
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ type: "", message: "" })}
        />
      )}

      <Formik
        initialValues={{
          email: "",
          createPassword: "",
          confirmPassword: "",
        }}
        validationSchema={SignupStep1Schema}
        onSubmit={handleSubmitStep1}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>

            {/* STEP INDICATOR */}
            <div className="step-indicator">
              <div className="back-arrow" onClick={() => navigate("/login")}>
                <FaAngleLeft size={20} color="#7C3AED" />
              </div>

              <p>Step 1 of 2 — Basic Details</p>

              <div className="progress-bar-container">
                <div className="progress-bar step-1"></div>
              </div>
            </div>

            {/* FORM TITLE */}
            <div className="form-title">
              <h1>Create Your Doctor Account</h1>
              <p>Join our platform to connect with patients securely</p>
            </div>

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

            {/* Create Password */}
            <div className="form-group">
              <label>Create Password</label>

              <div className="input-with-icon-container">
                <input
                  type={show.create ? "text" : "password"}
                  name="createPassword"
                  className="form-input"
                  placeholder="Enter password"
                  value={values.createPassword}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="password-toggle-button"
                  onClick={() => toggle("create")}
                >
                  {show.create ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>

              {errors.createPassword && touched.createPassword && (
                <p className="validation-error">{errors.createPassword}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label>Confirm Password</label>

              <div className="input-with-icon-container">
                <input
                  type={show.confirm ? "text" : "password"}
                  name="confirmPassword"
                  className="form-input"
                  placeholder="Re-enter password"
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

            <button className="submit-button">Continue</button>
          </form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default SignupStep1;
