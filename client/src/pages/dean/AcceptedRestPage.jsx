import React, { useState, useEffect } from "react";
import ApprovedRestCard from "../../components/dean/AcceptedRest";
import "../../styles/Announcementpage.css";
import { toast } from "react-toastify";
import { getRequest } from "../../services/api";
import Sidebar from "../../components/dean/Sidebar";

const ManagerRestPage = () => {
  const [RestRequests, setRestRequests] = useState([]);

  useEffect(() => {
    const fetchRestReq = async () => {
      try {
        const response = await getRequest("/rest/accepted-college-requests");
        if (response && response.data) {
          setRestRequests(response.data);
          console.log(response.data);
        } else {
          toast.error("No rest request available.");
        }
      } catch (error) {
        console.error("Error fetching rest request:", error);
        toast.error("Failed to fetch rest request. Please try again later.");
      }
    };

    fetchRestReq();
  }, []);

  return (
    <div>
      <Sidebar />
      <div
        className="announcement-container"
        style={{ marginTop: "3.2%", marginLeft: "30%" }}
      >
        {RestRequests.map((singleRestRequests) => (
          <ApprovedRestCard
            key={singleRestRequests._id}
            RestRequests={singleRestRequests}
          />
        ))}
      </div>
    </div>
  );
};

export default ManagerRestPage;
