import React, { useState, useEffect } from "react";
import RestCard from "../../components/staff/AcceptOrRejectRest";
import "../../styles/Announcementpage.css";
import { toast } from "react-toastify";
import { getRequest, putRequest } from "../../services/api";
import Sidebar from "../../components/staff/Sidebar";

const AcceptOrRejectRestPage = () => {
  const [RestRequests, setRestRequests] = useState([]);

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

  useEffect(() => {
    fetchRestReq();
  }, []);

  const handleApply = async (RestRequestsId, status) => {
    try {
      await putRequest(`/rest/hr/${RestRequestsId}`, {
        status,
      });
      toast.success("Updated successfully");
      fetchRestReq();
    } catch (error) {
      console.error("Error updating rest request:", error);
      toast.error("Failed to update rest request. Please try again later.");
    }
  };

  return (
    <div>
      <Sidebar />
      <div
        className="announcement-container"
        style={{ marginTop: "3.2%", marginLeft: "30%" }}
      >
        {RestRequests.map((singleRestRequests) => (
          <RestCard
            key={singleRestRequests._id}
            RestRequests={singleRestRequests}
            onAccept={() => handleApply(singleRestRequests._id, "accept")}
            onReject={() => handleApply(singleRestRequests._id, "reject")}
          />
        ))}
      </div>
    </div>
  );
};

export default AcceptOrRejectRestPage;
