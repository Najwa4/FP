import React from "react";
import AboutPage from "./pages/AboutPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
<BrowserRouter>
      <Routes>
        <Route path="/" element={<AboutPage />} />
      </Routes>   
      </BrowserRouter>
  );
}

export default App;
