import React from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const CreateNewPassword = ({
  changePassword,
  setChangePassword,
  errors,
  handleSubmit,
  showPassword,
  togglePasswordVisibility,
}) => {
    const navigate = useNavigate();

  return (
    
    <>
      <form onSubmit={handleSubmit}>

        {/* New Password */}
        <div className="form-group password-group">
          <label htmlFor="newPassword" className="form-label">
            New Password
          </label>

          <div className="input-with-icon-container">
            <input
              type={showPassword.create ? "text" : "password"}
              className="form-input"
              id="newPassword"
              placeholder="Enter New Password"
              name="newPassword"
              value={changePassword.newPassword}
              onChange={(e) =>
                setChangePassword({
                  ...changePassword,
                  newPassword: e.target.value,
                })
              }
            />

            <button
              type="button"
              className="password-toggle-button"
              onClick={() => togglePasswordVisibility("create")}
            >
              {showPassword.create ? (
                <FaRegEyeSlash size={20} />
              ) : (
                <FaRegEye size={20} />
              )}
            </button>
          </div>

          {errors?.newPassword && (
            <div className="validation-error">{errors.newPassword}</div>
          )}
        </div>

        {/* Confirm New Password */}
        <div className="form-group password-group">
          <label htmlFor="newconfirmPassword" className="form-label">
            Confirm Password
          </label>

          <div className="input-with-icon-container">
            <input
              type={showPassword.confirm ? "text" : "password"}
              className="form-input"
              id="newconfirmPassword"
              placeholder="Re-enter Your Password"
              name="newconfirmPassword"
              value={changePassword.newconfirmPassword}
              onChange={(e) =>
                setChangePassword({
                  ...changePassword,
                  newconfirmPassword: e.target.value,
                })
              }
            />

            <button
              type="button"
              className="password-toggle-button"
              onClick={() => togglePasswordVisibility("confirm")}
            >
              {showPassword.confirm ? (
                <FaRegEyeSlash size={20} />
              ) : (
                <FaRegEye size={20} />
              )}
            </button>
          </div>

          {errors?.newconfirmPassword && (
            <div className="validation-error">
              {errors.newconfirmPassword}
            </div>
          )}
        </div>

        {/* Submit Button */}
       <button
  type="button"
  className="submit-button continue-button"
  style={{ marginTop: "40px" }}
  onClick={() => navigate("/forgot/success")}
>
  Reset Password
</button>

      </form>
    </>
  );
};

export default CreateNewPassword;
