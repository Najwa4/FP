import React from "react";
import RegistrationForm from "../components/RegistrationForm"; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom";

const PersonalInformationpage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/announce");
  };

  return (
    <div className="personal-info">
      <button
        onClick={handleGoBack}
        style={{
          color: "black",
          backgroundColor: "transparent",
          border: "none",
          fontSize: "50px",
          cursor: "pointer",
          paddingLeft: "2%",
        }}
      >
        &#11104;
      </button>
      <h1 style={{ fontSize: "28px", textAlign: "center" }}>
        Applicant Information Page
      </h1>
      <RegistrationForm />
    </div>
  );
};

export default PersonalInformationpage;
