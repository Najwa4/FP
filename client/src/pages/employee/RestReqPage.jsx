import React from "react";
import RestReq from "../../components/employee/RestReq";
import Sidebar from "../../components/employee/Sidebar";

const RestReqPage = () => {
  return (
    <div style={{ marginTop: "3.2%" }}>
      <Sidebar />
      <RestReq />
    </div>
  );
};

export default RestReqPage;
