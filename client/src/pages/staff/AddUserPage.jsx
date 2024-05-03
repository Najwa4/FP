import React from "react";
import AddUser from "../../components/staff/AddUser";
import Sidebar from "../../components/staff/Sidebar";
import "../../styles/Table.css";

const AddUserpage = () => {
  return (
    <div>
      <Sidebar />
      <div className="page">
        <h1 style={{ fontSize: "28px", textAlign: "center" }}>
          Add New Employee
        </h1>
        <AddUser />
      </div>
    </div>
  );
};

export default AddUserpage;
