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
import AcceptOrRejectRestPage from "./pages/staff/AcceptOrRejectRestPage";
import ApprovedRestPage from "./pages/staff/ApprovedRestPage";
import FindEmpPageStaff from "./pages/staff/FindEmpPageStaff";
import FindAppPage from "./pages/staff/FindAppPage";
import AddCollegePage from "./pages/staff/AddCollegePage";
import AddDepartmentPage from "./pages/staff/AddDepartmentPage";
import UpdateTestDayPage from "./pages/staff/UpdateTestDayPage";
import ProfilePage from "./pages/ProfilePage";
import ReportPage from "./pages/ReportPage";
import ChangePassPage from "./pages/ChangePassPage";

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
        {/* Routes for HR manager */}
        <Route path="/ManagerSidebar" element={<ManagerSidebar />} />
        <Route path="/manager-announce" element={<ManagerAnnouncePage />} />
        <Route path="/manager-posted" element={<PostedAnnouncePage />} />
        <Route path="/manager-reject" element={<RejectAnnouncePage />} />
        <Route path="/find-emppage" element={<FindEmppage />} />
        <Route path="/Quit" element={<QuitjobPage />} />
        {/* Routes for HR staff */}
        <Route path="/ManagerRest" element={<AcceptOrRejectRestPage />} />
        <Route path="/Approved" element={<ApprovedRestPage />} />
        <Route path="/find-employee" element={<FindEmpPageStaff />} />
        <Route path="/find-applicant" element={<FindAppPage />} />
        <Route path="/AddColl" element={<AddCollegePage />} />
        <Route path="/AddDep" element={<AddDepartmentPage />} />
        <Route path="/Test" element={<UpdateTestDayPage />} />

        <Route path="/Profile" element={<ProfilePage />} />
        <Route path="/Report" element={<ReportPage />} />
        <Route path="/ChangePass" element={<ChangePassPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
