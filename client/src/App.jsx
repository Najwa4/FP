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
import MProfilePage from "./pages/manager/ProfilePage";
import MReportPage from "./pages/manager/ReportPage";
import MChangePassPage from "./pages/manager/ChangePassPage";
import AcceptOrRejectRestPage from "./pages/staff/AcceptOrRejectRestPage";
import ApprovedRestPage from "./pages/staff/ApprovedRestPage";
import FindEmpPageStaff from "./pages/staff/FindEmpPageStaff";
import FindAppPage from "./pages/staff/FindAppPage";
import AddCollegePage from "./pages/staff/AddCollegePage";
import AddDepartmentPage from "./pages/staff/AddDepartmentPage";
import UpdateTestDayPage from "./pages/staff/UpdateTestDayPage";
import ProfilePage from "./pages/staff/ProfilePage";
import ReportPage from "./pages/staff/ReportPage";
import ChangePassPage from "./pages/staff/ChangePassPage";
import AddUserPage from "./pages/staff/AddUserPage";
import UpdateUserPage from "./pages/staff/UpdateUserPage";
import DAcceptOrRejectRestPage from "./pages/dean/AcceptOrRejectRestPage";
import AcceptedRestPage from "./pages/dean/AcceptedRestPage";
import DProfilePage from "./pages/dean/ProfilePage";
import DReportPage from "./pages/dean/ReportPage";
import DChangePassPage from "./pages/dean/ChangePassPage";
import DQuitReqPage from "./pages/dean/QuitReqPage";
import DRestReqPage from "./pages/dean/RestReqPage";
import EProfilePage from "./pages/employee/ProfilePage";
import EReportPage from "./pages/employee/ReportPage";
import EChangePassPage from "./pages/employee/ChangePassPage";
import EQuitReqPage from "./pages/employee/QuitReqPage";
import ERestReqPage from "./pages/employee/RestReqPage";
import HProfilePage from "./pages/head/ProfilePage";
import HReportPage from "./pages/head/ReportPage";
import HChangePassPage from "./pages/head/ChangePassPage";
import HQuitReqPage from "./pages/head/QuitReqPage";
import HRestReqPage from "./pages/head/RestReqPage";
import NewEmpReqPage from "./pages/head/NewEmpReqPage";
import UpdateAnnouncePage from "./pages/head/UpdateAnnouncePage";
import UpdateAbsencePage from "./pages/head/UpdateAbsencePage";

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
        <Route path="/Prof" element={<MProfilePage />} />
        <Route path="/Rep" element={<MReportPage />} />
        <Route path="/Pass" element={<MChangePassPage />} />
        {/* Routes for HR staff */}
        <Route path="/ManagerRest" element={<AcceptOrRejectRestPage />} />
        <Route path="/Approved" element={<ApprovedRestPage />} />
        <Route path="/find-employee" element={<FindEmpPageStaff />} />
        <Route path="/find-applicant" element={<FindAppPage />} />
        <Route path="/AddColl" element={<AddCollegePage />} />
        <Route path="/AddDep" element={<AddDepartmentPage />} />
        <Route path="/Test" element={<UpdateTestDayPage />} />
        <Route path="/AddUser" element={<AddUserPage />} />
        <Route path="/UpdateUser" element={<UpdateUserPage />} />
        <Route path="/Profile" element={<ProfilePage />} />
        <Route path="/Report" element={<ReportPage />} />
        <Route path="/ChangePass" element={<ChangePassPage />} />
        {/* Routes for Dean */}
        <Route path="/DeanRest" element={<DAcceptOrRejectRestPage />} />
        <Route path="/Accepted" element={<AcceptedRestPage />} />
        <Route path="/DeanProfile" element={<DProfilePage />} />
        <Route path="/DeanReport" element={<DReportPage />} />
        <Route path="/DeanChangePass" element={<DChangePassPage />} />
        <Route path="/DQuit" element={<DQuitReqPage />} />
        <Route path="/DRest" element={<DRestReqPage />} />
        {/* Routes for Employee */}
        <Route path="/EmpProfile" element={<EProfilePage />} />
        <Route path="/EmpReport" element={<EReportPage />} />
        <Route path="/EmpChangePass" element={<EChangePassPage />} />
        <Route path="/EmpQuit" element={<EQuitReqPage />} />
        <Route path="/EmpRest" element={<ERestReqPage />} />
        {/* Routes for Head */}
        <Route path="/HProfile" element={<HProfilePage />} />
        <Route path="/HReport" element={<HReportPage />} />
        <Route path="/HChangePass" element={<HChangePassPage />} />
        <Route path="/HQuit" element={<HQuitReqPage />} />
        <Route path="/HRest" element={<HRestReqPage />} />
        <Route path="/NewEmp" element={<NewEmpReqPage />} />
        <Route path="/UpdateAnnoun" element={<UpdateAnnouncePage />} />
        <Route path="/Absence" element={<UpdateAbsencePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
