import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash, FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../../components/auth/AuthLayout";
import AlertBox from "../../../components/common/AlertBox";

const CreateNewPassword = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    new: false,
    confirm: false,
  });

  const [alert, setAlert] = useState({ type: "", message: "" });
  const [errors, setErrors] = useState({});

  const toggle = (f) => setShow((p) => ({ ...p, [f]: !p[f] }));

  const validate = () => {
    let e = {};

    if (form.newPassword.length < 6) e.newPassword = "Min 6 characters";
    if (form.confirmPassword !== form.newPassword)
      e.confirmPassword = "Passwords don't match";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      setAlert({ type: "error", message: "Fix the errors above" });
      return;
    }

    setAlert({ type: "success", message: "Password changed successfully!" });

    setTimeout(() => navigate("/forgot/success"), 1500);
  };

  return (
    <AuthLayout>
      {alert.message && (
        <AlertBox
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ type: "", message: "" })}
        />
      )}

      <div className="back-arrow" onClick={() => navigate("/forgot/verify-otp")}>
        <FaAngleLeft size={20} color="#7C3AED" />
      </div>

      <div className="form-title">
        <h1>Create New Password</h1>
        <p>Set a strong password to secure your account</p>
      </div>

      <form onSubmit={handleSubmit}>

        {/* New Password */}
        <div className="form-group">
          <label>New Password</label>
          <div className="input-with-icon-container">
            <input
              type={show.new ? "text" : "password"}
              className="form-input"
              placeholder="Enter new password"
              value={form.newPassword}
              onChange={(e) =>
                setForm({ ...form, newPassword: e.target.value })
              }
            />

            <button
              type="button"
              className="password-toggle-button"
              onClick={() => toggle("new")}
            >
              {show.new ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>
          {errors.newPassword && (
            <div className="validation-error">{errors.newPassword}</div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="form-group">
          <label>Confirm Password</label>
          <div className="input-with-icon-container">
            <input
              type={show.confirm ? "text" : "password"}
              className="form-input"
              placeholder="Re-enter password"
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
            <div className="validation-error">{errors.confirmPassword}</div>
          )}
        </div>

        <button className="submit-button">Reset Password</button>
      </form>
    </AuthLayout>
  );
};

export default CreateNewPassword;
