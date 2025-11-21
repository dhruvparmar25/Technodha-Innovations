import React, { useState, useEffect } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../../components/auth/AuthLayout";
import AlertBox from "../../../components/common/AlertBox";

const SignupStep2 = () => {
  const navigate = useNavigate();

  // Step1 ka data store karne ke liye
  const [step1Data, setStep1Data] = useState(null);

  // Step1 data load karega
// Load Step1 Data
useEffect(() => {
  const loadStep1 = () => {
    const saved = localStorage.getItem("signupStep1");
    if (saved) {
      setStep1Data(JSON.parse(saved));
      console.log("Step1 Loaded Data:", JSON.parse(saved));
    }
  };

  loadStep1();
}, []);


  // Step2 form
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    clinic: "",
    licenseNumber: "",
    contact: "",
  });

  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ type: "", message: "" });

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

    if (!validate()) return;

    // Combine Step1 + Step2
    const finalData = {
      ...step1Data,
      ...form,
    };

    console.log("Final Signup Data:", finalData);

    localStorage.setItem("signupFinalData", JSON.stringify(finalData));

    setAlert({ type: "success", message: "Profile Completed!" });

    setTimeout(() => {
      navigate("/signup/success");
    }, 1500);
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

      <form onSubmit={handleSubmit}>
        
        {/* STEP INDICATOR */}
        <div className="step-indicator">
          <div className="back-arrow" onClick={() => navigate("/signup/step1")}>
            <FaAngleLeft size={20} color="#7C3AED" />
          </div>

          <p>Step 2 of 2 — Professional Details</p>

          <div className="progress-bar-container">
            <div className="progress-bar step-2"></div>
          </div>
        </div>

        {/* FORM TITLE */}
        <div className="form-title">
          <h1>Create Your Doctor Account</h1>
          <p>Join our platform to connect with patients securely</p>
        </div>

        {/* Name */}
        <div className="form-group">
          <label>Name</label>
          <input
            className="form-input"
            name="name"
            placeholder="Enter name"
            value={form.name}
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
            onChange={(e) => setForm({ ...form, specialization: e.target.value })}
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
            name="clinic"
            placeholder="Enter clinic name"
            value={form.clinic}
            onChange={(e) => setForm({ ...form, clinic: e.target.value })}
          />
          {errors.clinic && <p className="validation-error">{errors.clinic}</p>}
        </div>

        {/* License Number */}
        <div className="form-group">
          <label>License Number (Optional)</label>
          <input
            className="form-input"
            name="licenseNumber"
            placeholder="Enter license"
            value={form.licenseNumber}
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
            name="contact"
            placeholder="10-digit mobile"
            value={form.contact}
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
