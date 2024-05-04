import React from "react";
import MyForm from "../../components/staff/AddCollege";
import Sidebar from "../../components/staff/Sidebar";

const AddCollegePage = () => {
  return (
    <div style={{ marginTop: "3.2%"}}>
      <Sidebar />
      <MyForm />
    </div>
  );
};

export default AddCollegePage;
