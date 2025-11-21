import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import AuthLayout from "../../../components/auth/AuthLayout";
import { useNavigate } from "react-router-dom";

const CreateNewPassword = () => {
  const navigate = useNavigate();

  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    new: false,
    confirm: false,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let e = {};
    let ok = true;

    if (!passwords.newPassword.trim())
      (e.newPassword = "Password required"), (ok = false);

    if (!passwords.confirmPassword.trim())
      (e.confirmPassword = "Confirm required"), (ok = false);

    if (
      passwords.newPassword &&
      passwords.confirmPassword &&
      passwords.newPassword !== passwords.confirmPassword
    ) {
      e.confirmPassword = "Passwords do not match";
      ok = false;
    }

    setErrors(e);
    return ok;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) navigate("/forgot/success");
  };

  return (
    <AuthLayout title="Reset Password" subtitle="Enter your new password">
      <form onSubmit={handleSubmit}>
        {/* New Password */}
        <div className="form-group password-group">
          <label>New Password</label>
          <div className="input-with-icon-container">
            <input
              type={show.new ? "text" : "password"}
              className="form-input"
              placeholder="Enter new password"
              value={passwords.newPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, newPassword: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() => setShow({ ...show, new: !show.new })}
            >
              {show.new ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>
          {errors.newPassword && (
            <p className="validation-error">{errors.newPassword}</p>
          )}
        </div>

        {/* Confirm */}
        <div className="form-group password-group">
          <label>Confirm Password</label>
          <div className="input-with-icon-container">
            <input
              type={show.confirm ? "text" : "password"}
              className="form-input"
              placeholder="Confirm new password"
              value={passwords.confirmPassword}
              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  confirmPassword: e.target.value,
                })
              }
            />
            <button
              type="button"
              onClick={() =>
                setShow({ ...show, confirm: !show.confirm })
              }
            >
              {show.confirm ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="validation-error">{errors.confirmPassword}</p>
          )}
        </div>

        <button className="submit-button" style={{ marginTop: 40 }}>
          Reset Password
        </button>
      </form>
    </AuthLayout>
  );
};

export default CreateNewPassword;
