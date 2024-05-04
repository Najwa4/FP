import React from "react";
import AddDepartmentForm from "../../components/staff/AddDepartment";
import Sidebar from "../../components/staff/Sidebar";

const AddCollegePage = () => {
  return (
    <div style={{ marginTop: "3.2%"}}>
      <Sidebar />
      <AddDepartmentForm />
    </div>
  );
};

export default AddCollegePage;
