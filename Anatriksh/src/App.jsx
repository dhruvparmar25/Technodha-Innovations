import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import Dashboard_layout from "./components/layout/Dashboard_layout";
import Login from "./pages/auth/login/Login";
import SignupStep1 from "./pages/auth/signup/SignupStep1";
import SignupStep2 from "./pages/auth/signup/SignupStep2";
import ForgotPassword from "./pages/auth/forgotPassword/ForgotPassword";
import OtpVerification from "./pages/auth/forgotPassword/OtpVerification";
import PasswordSuccess from "./pages/auth/forgotPassword/PasswordSuccess";
import SignupSuccess from "./pages/auth/Signup/SignupSuccess";
import CreateNewPassword from "./pages/auth/ForgotPassword/CreateNewPassword";

function App() {
  return (
    <Routes>
      {/* -------------- Dashboard Protected Layout --------------- */}
      <Route element={<Dashboard_layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      {/* -------------- Default Redirect --------------- */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      {/* Login */}
      <Route path="/login" element={<Login />} />
      {/* Signup */}
      <Route path="/signup/step1" element={<SignupStep1 />} />
      <Route path="/signup/step2" element={<SignupStep2 />} />
      <Route path="/signup/success" element={<SignupSuccess />} />
      {/* Forgot Password */}
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/forgot/verify-otp" element={<OtpVerification />} />
      <Route path="/forgot/create-new-password" element={<CreateNewPassword />}/>
      <Route path="/forgot/success" element={<PasswordSuccess />} />
    </Routes>
  );
}

export default App;
