import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import OtpVerificationPage from "./pages/auth/ForgotPassword/OtpVerificationPage";
import DoctorAuthPage from "./pages/User/DoctorAuthPage";
import Dashboard from "./pages/Admin/Dashboard";
import Dashboard_layout from "./components/layout/Dashboard_layout";
// import DoctorAuthPage from "./pages/DoctorAuthPage";
// import OtpVerificationPage from "./pages/User/forgetPassword/OtpVerificationPage";
// import Dashboard from "./pages/Admin/Dashboard";
// import Dashboard_layout from "./layouts/Dashboard_layout";

function App() {
  return (
    <Routes>

      {/* -------------- Dashboard Protected Layout --------------- */}
      <Route element={<Dashboard_layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* -------------- Default Redirect --------------- */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* -------------- Login --------------- */}
      <Route path="/login" element={<DoctorAuthPage mode="login" />} />

      {/* -------------- Signup Flow --------------- */}
      <Route path="/signup" element={<DoctorAuthPage mode="signupStep1" />} />
      <Route path="/signup/step2" element={<DoctorAuthPage mode="signupStep2" />} />
      <Route path="/signup/success" element={<DoctorAuthPage mode="signupSuccess" />} />

      {/* -------------- Forgot Password Flow --------------- */}
      <Route path="/forgot" element={<DoctorAuthPage mode="forgotPassword" />} />
      <Route path="/forgot/verify-otp" element={<OtpVerificationPage />} />
      <Route path="/forgot/create-new-password" element={<DoctorAuthPage mode="createNewPassword" />} />
      <Route path="forget/success" element={<DoctorAuthPage mode="passwordSuccess" />} />

    </Routes>
  );
}

export default App;
