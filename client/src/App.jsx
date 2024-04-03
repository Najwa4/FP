import React from "react";
import AboutPage from "./pages/AboutPage";
import LoginScreen from "./pages/auth/LogIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VerificationPage from "./pages/Passswoard/OtpVerification";
import ResetPasswordScreen from "./pages/Passswoard/ResetPassword";
import AnnouncementPage from "./pages/Announcementpage";
import PersonalInformationPage from "./pages/PersonalInformationpage";
import ForgotPasswordScreen from "./pages/Passswoard/ForgotPassword";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AboutPage />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/verification" element={<VerificationPage />} />
        <Route path="/reset" element={<ResetPasswordScreen />} />
        <Route path="/announce" element={<AnnouncementPage />} />
        <Route
          path="/personal-information"
          element={<PersonalInformationPage />}
        />
        <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
        <Route path="/Sidebar" element={<Sidebar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
