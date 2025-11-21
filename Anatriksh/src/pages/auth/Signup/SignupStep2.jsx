import React, { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../../components/auth/AuthLayout";

const SignupStep2 = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    specialization: "",
    clinic: "",
    licenseNumber: "",
    contact: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let e = {};

    if (!form.name.trim()) e.name = "Name required";
    if (!form.specialization) e.specialization = "Select specialization";
    if (!form.clinic.trim()) e.clinic = "Clinic required";
    if (!/^[0-9]{10}$/.test(form.contact)) e.contact = "10-digit required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) navigate("/signup/success");
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit}>

        {/* Step Indicator */}
        <div className="step-indicator">
          <div
            className="back-arrow"
            onClick={() => navigate("/signup/step1")}
          >
            <FaAngleLeft size={20} color="#7C3AED" />
          </div>

          <p>Step 2 of 2 — Professional Details</p>

          <div className="progress-bar-container">
            <div className="progress-bar step-2"></div>
          </div>
        </div>

        {/* Title */}
        <div className="form-title">
          <h1>Create Your Doctor Account</h1>
          <p>Join our platform to connect with patients securely</p>
        </div>

        {/* Name */}
        <div className="form-group">
          <label>Name</label>
          <input
            className="form-input"
            value={form.name}
            name="name"
            placeholder="Enter name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {errors.name && <p className="validation-error">{errors.name}</p>}
        </div>

        {/* Specialization */}
        <div className="form-group">
          <label>Specialization</label>
          <select
            className="form-input"
            name="specialization"
            value={form.specialization}
            onChange={(e) =>
              setForm({ ...form, specialization: e.target.value })
            }
          >
            <option value="">Select specialization</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Dermatology">Dermatology</option>
          </select>
          {errors.specialization && (
            <p className="validation-error">{errors.specialization}</p>
          )}
        </div>

        {/* Clinic */}
        <div className="form-group">
          <label>Clinic / Hospital</label>
          <input
            className="form-input"
            value={form.clinic}
            name="clinic"
            placeholder="Enter clinic name"
            onChange={(e) => setForm({ ...form, clinic: e.target.value })}
          />
          {errors.clinic && <p className="validation-error">{errors.clinic}</p>}
        </div>

        {/* License */}
        <div className="form-group">
          <label>License Number (Optional)</label>
          <input
            className="form-input"
            value={form.licenseNumber}
            name="licenseNumber"
            placeholder="Enter license"
            onChange={(e) =>
              setForm({ ...form, licenseNumber: e.target.value })
            }
          />
        </div>

        {/* Contact */}
        <div className="form-group">
          <label>Contact</label>
          <input
            className="form-input"
            value={form.contact}
            name="contact"
            placeholder="Enter 10-digit mobile"
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
          />
          {errors.contact && (
            <p className="validation-error">{errors.contact}</p>
          )}
        </div>

        <button className="submit-button">Save Profile</button>
      </form>
    </AuthLayout>
  );
};

export default SignupStep2;
