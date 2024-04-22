import React, { useState, useEffect } from "react";
import QuitjobCard from "../../components/manager/QuitjobCard";
import "../../styles/Announcementpage.css";
import { toast } from "react-toastify";
import { getRequest, putRequest } from "../../services/api";
import Sidebar from "../../components/manager/ManagerSidebar";

const ManagerAnnouncePage = () => {
  const [quitJobRequests, setQuitJobRequests] = useState([]);

  useEffect(() => {
    const fetchQuitJobRequests = async () => {
      try {
        const response = await getRequest("/quit/quit-job");
        if (response && response.data) {
          setQuitJobRequests(response.data);
          console.log(response.data);
        } else {
          toast.error("No requests available.");
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
        toast.error("Failed to fetch requests. Please try again later.");
      }
    };

    fetchQuitJobRequests();
  }, []);

  //   useEffect(() => {
  //     console.log(quitJobRequests);
  //   }, [quitJobRequests]);

  const handleApply = async (QuitRequestsId, status) => {
    try {
      await putRequest(`/quit/status/${QuitRequestsId}`, {
        status,
      });
      toast.success("Updated successfully");
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error("Error updating requests:", error);
      toast.error("Failed to update requests. Please try again later.");
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="announcement-container">
        {quitJobRequests.map((singleQuitJobRequests) => (
          <QuitjobCard
            key={singleQuitJobRequests._id}
            quitJobRequests={singleQuitJobRequests}
            onAccept={() => handleApply(singleQuitJobRequests._id, "accept")}
            onReject={() => handleApply(singleQuitJobRequests._id, "reject")}
          />
        ))}
      </div>
    </div>
  );
};

export default ManagerAnnouncePage;
