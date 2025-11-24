// App routes
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/login/Login";
import SignupStep1 from "./pages/auth/signup/SignupStep1";
import SignupStep2 from "./pages/auth/signup/SignupStep2";
import ForgotPassword from "./pages/auth/forgotPassword/ForgotPassword";
import OtpVerification from "./pages/auth/forgotPassword/OtpVerification";
import PasswordSuccess from "./pages/auth/forgotPassword/PasswordSuccess";
import DashboardLayout from "./components/dashboard/layout/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import CreateNewPassword from "./pages/auth/forgotPassword/CreateNewPassword";
import SignupSuccess from "./pages/auth/signup/SignupSuccess";

function App() {
    return (
        <Routes>
            {/* Protected dashboard */}
            <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<DashboardHome />} />
            </Route>

            {/* Redirect root */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Login */}
            <Route path="/login" element={<Login />} />

            {/* Signup flow */}
            <Route path="/signup/step1" element={<SignupStep1 />} />
            <Route path="/signup/verify/:id" element={<OtpVerification />} />
            <Route path="/signup/step2" element={<SignupStep2 />} />
            <Route path="/signup/success" element={<SignupSuccess />} />

            {/* Forgot password flow */}
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/forgot/verify-otp" element={<OtpVerification />} />
            <Route path="/forgot/create-new-password" element={<CreateNewPassword />} />
            <Route path="/forgot/success" element={<PasswordSuccess />} />
        </Routes>
    );
}

export default App;
