import React from "react";
import QuitReq from "../../components/employee/QuitReq";
import Sidebar from "../../components/employee/Sidebar";

const QuitReqPage = () => {
  return (
    <div style={{ marginTop: "3.2%" }}>
      <Sidebar />
      <QuitReq />
    </div>
  );
};

export default QuitReqPage;
