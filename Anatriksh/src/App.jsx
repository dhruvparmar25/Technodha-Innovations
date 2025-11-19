import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DoctorAuthPage from "./pages/DoctorAuthPage";
import OtpVerificationPage from "./pages/User/forgetPassword/OtpVerificationPage";


function App() {
  return (
    <Routes>

      {/* Default Redirect */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Login */}
      <Route path="/login" element={<DoctorAuthPage mode="login" />} />

      {/* Signup Flow */}
      <Route path="/signup" element={<DoctorAuthPage mode="signupStep1" />} />
      <Route path="/signup/step2" element={<DoctorAuthPage mode="signupStep2" />} />
      <Route path="/signup/success" element={<DoctorAuthPage mode="signupSuccess" />} />

      {/* Forgot Password Flow */}
      <Route path="/forgot" element={<DoctorAuthPage mode="forgotPassword" />} />
      <Route path="/forgot/verify-otp" element={<OtpVerificationPage />} />

      {/* Create New Password (Correct Route) */}
      <Route
        path="/forgot/create-new-password"
        element={<DoctorAuthPage mode="createNewPassword" />}
      />
      <Route path="/forget/success" element={<DoctorAuthPage mode="passwordSuccess" />} />


    </Routes>
  );
}

export default App;
