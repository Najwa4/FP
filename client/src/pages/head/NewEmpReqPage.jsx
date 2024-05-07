import React from "react";
import AddAnnouncePage from "../../components/head/NewEmpReq";
import Sidebar from "../../components/head/Sidebar";
import "../../styles/Table.css";

const AddUserpage = () => {
  return (
    <div>
      <Sidebar />
      <div className="page">
        <h1>Add New Announcement</h1>
        <AddAnnouncePage />
      </div>
    </div>
  );
};

export default AddUserpage;
