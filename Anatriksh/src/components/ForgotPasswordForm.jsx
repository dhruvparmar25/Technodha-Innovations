
import React from 'react';

const ForgotPasswordForm = ({ forgotEmail, setForgotEmail, forgotErrors, handleSubmit, switchToLogin }) => {
  return (
    <form onSubmit={handleSubmit}>
      {/* Email Input for Reset */}
      <div className="form-group">
        <label htmlFor="forgotEmail" className="form-label">Email Address</label>
        <input
          type="text"
          className="form-input" 
          id="forgotEmail"
          placeholder="Enter Your Email"
          value={forgotEmail}
          onChange={(e) => setForgotEmail(e.target.value)}
        />
        {forgotErrors.forgotEmail && (
          <div className="validation-error">{forgotErrors.forgotEmail}</div>
        )}
      </div>
      
      {/* Submit Button */}
      <button type="submit" className="submit-button">
        Send Reset Link
      </button>
      
      {/* Back to Login Button */}
      <button 
        type="button" 
        className="secondary-button" 
        onClick={switchToLogin} // Prop call
      >
        Back to Login
      </button>
    </form>
  );
};

export default ForgotPasswordForm;