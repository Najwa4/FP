import React from "react";
import AboutPage from "./pages/AboutPage";
import PhotoUpload from "./pages/PhotoUpload";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
<BrowserRouter>
      <Routes>
        <Route path="/" element={<AboutPage />} />
        <Route path="/photo" element={<PhotoUpload />} />
      </Routes>   
      </BrowserRouter>
  );
}

export default App;
