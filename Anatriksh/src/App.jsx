import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DoctorAuthPage from "./pages/DoctorAuthPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Login & Signup Routes */}
      <Route path="/login" element={<DoctorAuthPage mode="login" />} />
      <Route path="/signup" element={<DoctorAuthPage mode="signupStep1" />} />
      <Route path="/signup/step2" element={<DoctorAuthPage mode="signupStep2" />} />
      <Route path="/signup/success" element={<DoctorAuthPage mode="signupSuccess" />} />


      {/* Forgot Password */}
      <Route path="/forgot" element={<DoctorAuthPage mode="forgotPassword" />} />
    </Routes>
  );
}

export default App;
