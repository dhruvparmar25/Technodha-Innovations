import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash, FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../../components/auth/AuthLayout";
import AlertBox from "../../../components/common/AlertBox";

const SignupStep1 = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    createPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ type: "", message: "" });

  const [show, setShow] = useState({
    create: false,
    confirm: false,
  });

  const toggle = (field) =>
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));

  const validate = () => {
    let e = {};

    if (!form.email.includes("@")) e.email = "Invalid email";
    if (form.createPassword.length < 6) e.createPassword = "Min 6 chars";
    if (form.confirmPassword !== form.createPassword)
      e.confirmPassword = "Passwords don't match";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      setAlert({ type: "error", message: "Please fix the errors above." });
      return;
    }

    localStorage.setItem("signupStep1", JSON.stringify(form));
    setAlert({ type: "success", message: "Step 1 completed!" });

    setTimeout(() => navigate("/signup/step2"), 2500);
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
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && <p className="validation-error">{errors.email}</p>}
        </div>

        {/* Create Password */}
        <div className="form-group">
          <label>Create Password</label>
          <div className="input-with-icon-container">
            <input
              type={show.create ? "text" : "password"}
              className="form-input"
              name="createPassword"
              placeholder="Enter Password"
              value={form.createPassword}
              onChange={(e) =>
                setForm({ ...form, createPassword: e.target.value })
              }
            />
            <button
              type="button"
              className="password-toggle-button"
              onClick={() => toggle("create")}
            >
              {show.create ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>
          {errors.createPassword && (
            <p className="validation-error">{errors.createPassword}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="form-group">
          <label>Confirm Password</label>
          <div className="input-with-icon-container">
            <input
              type={show.confirm ? "text" : "password"}
              className="form-input"
              name="confirmPassword"
              placeholder="Re-enter Password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
            />
            <button
              type="button"
              className="password-toggle-button"
              onClick={() => toggle("confirm")}
            >
              {show.confirm ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="validation-error">{errors.confirmPassword}</p>
          )}
        </div>

        <button className="submit-button">Continue</button>
      </form>
    </AuthLayout>
  );
};

export default SignupStep1;
