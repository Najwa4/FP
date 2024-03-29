import React from "react";
import AboutPage from "./pages/AboutPage";
import LoginScreen from "./pages/auth/LogIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VerificationPage from "./pages/Passswoard/OtpVerification";
import ResetPasswordScreen from "./pages/Passswoard/ResetPassword";

function App() {
  return (
<BrowserRouter>
      <Routes>
        <Route path="/" element={<AboutPage />} />
        <Route path = "/login" element={<LoginScreen/>}/>
        <Route path="/verification" element={<VerificationPage/>}/>
        <Route path="/reset" element= {<ResetPasswordScreen/>}/>
      </Routes>   
      </BrowserRouter>
  );
}

export default App;
