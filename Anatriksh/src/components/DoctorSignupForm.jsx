import React from 'react';
import { FaAngleLeft } from "react-icons/fa"; 

const DoctorSignupForm = ({
  formData,
  errors,
  handleChange,
  handleSubmit,
  switchToLogin,
  switchToSignupStep1 // NEW PROP: To go back to step 1
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="step-indicator">
        <div className="back-arrow" onClick={switchToSignupStep1}> 
          <FaAngleLeft size={20} color="#7C3AED" />
        </div>
        <p>Step 2 of 2 — Professional Details</p>
        <div className="progress-bar-container">
            <div className="progress-bar step-2"></div>
        </div>
      </div>
<div className="form-title">
    <h1>Create Your Doctor Account</h1>
    <p>Join our platform to connect with patients securely</p>
</div>
      {/* Name Input */}
      <div className="form-group">
        <label htmlFor="name" className="form-label">Name</label>
        <input
          type="text"
          className="form-input"
          id="name"
          placeholder="Enter your name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && (
          <div className="validation-error">{errors.name}</div>
        )}
      </div>

      {/* Specialization Select */}
      <div className="form-group">
        <label htmlFor="specialization" className="form-label">Specialization</label>
        <select
          className="form-input"
          id="specialization"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
        >
          <option value="">Select your specialization</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Neurology">Neurology</option>
          <option value="Dermatology">Dermatology</option>
          {/* Add more specializations as needed */}
        </select>
        {errors.specialization && (
          <div className="validation-error">{errors.specialization}</div>
        )}
      </div>

      {/* Clinic / Hospital Name Input */}
      <div className="form-group">
        <label htmlFor="clinic" className="form-label">Clinic / Hospital Name</label>
        <input
          type="text"
          className="form-input"
          id="clinic"
          placeholder="Enter your workplace name"
          name="clinic"
          value={formData.clinic}
          onChange={handleChange}
        />
        {errors.clinic && (
          <div className="validation-error">{errors.clinic}</div>
        )}
      </div>

      {/* License Number Input */}
      <div className="form-group">
        <label htmlFor="licenseNumber" className="form-label">License Number</label>
        <input
          type="text"
          className="form-input"
          id="licenseNumber"
          placeholder="Enter your medical registration ID"
          name="licenseNumber"
          value={formData.licenseNumber}
          onChange={handleChange}
        />
        {errors.licenseNumber && (
          <div className="validation-error">{errors.licenseNumber}</div>
        )}
      </div>

      {/* Contact Input */}
      <div className="form-group">
        <label htmlFor="contact" className="form-label">Contact</label>
        <input
          type="text"
          className="form-input"
          id="contact"
          placeholder="Enter your contact number"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
        />
        {errors.contact && (
          <div className="validation-error">{errors.contact}</div>
        )}
      </div>

      {/* Submit Button */}
      <button type="submit" className="submit-button save-profile-button">
        Save Profile
      </button>

      {/* Already have an account? Login */}
      <div className="toggel-btn">
        Already have an account?
        <a href="#" className="signup-link" onClick={switchToLogin}>
          Login
        </a>
      </div>
    </form>
  );
};

export default DoctorSignupForm;