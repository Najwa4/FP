import React from "react";
import AboutPage from "./pages/AboutPage";
import LoginScreen from "./pages/auth/LogIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VerificationPage from "./pages/Passswoard/OtpVerification";
import ResetPasswordScreen from "./pages/Passswoard/ResetPassword";
import AnnouncementPage from "./pages/Announcementpage";
import PersonalInformationPage from "./pages/PersonalInformationpage";
import ForgotPasswordScreen from "./pages/Passswoard/ForgotPassword";
import ManagerSidebar from "./components/manager/ManagerSidebar";
import ManagerAnnouncePage from "./pages/manager/ManagerAnnouncePage";
import PostedAnnouncePage from "./pages/manager/PostedAnnouncePage";
import RejectAnnouncePage from "./pages/manager/RejectAnnouncePage";
import FindEmppage from "./pages/manager/FindEmppage";
import QuitjobPage from "./pages/manager/QuitjobPage";

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
        <Route path="/ManagerSidebar" element={<ManagerSidebar />} />
        <Route path="/manager-announce" element={<ManagerAnnouncePage />} />
        <Route path="/manager-posted" element={<PostedAnnouncePage />} />
        <Route path="/manager-reject" element={<RejectAnnouncePage />} />
        <Route path="/find-emppage" element={<FindEmppage />} />
        <Route path="/Quit" element={<QuitjobPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
