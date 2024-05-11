import React, { useState, useEffect } from "react";
import AnnouncementCard from "../../components/manager/ManagerAnnounceCard";
import "../../styles/Announcementpage.css";
import { toast } from "react-toastify";
import { getRequest, putRequest } from "../../services/api";
import Sidebar from "../../components/manager/ManagerSidebar";

const ManagerAnnouncePage = () => {
  const [announcements, setAnnouncements] = useState([]);

  const fetchAnnouncements = async () => {
    try {
      const response = await getRequest("/announcements/stateless");
      if (response && response.data) {
        setAnnouncements(response.data);
        console.log(response.data);
      } else {
        toast.error("No announcements available.");
      }
    } catch (error) {
      console.error("Error fetching announcements:", error);
      toast.error("Failed to fetch announcements. Please try again later.");
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleApply = async (announcementId, status) => {
    try {
      await putRequest(`/announcements/accept-reject/${announcementId}`, {
        status,
      });
      toast.success("Updated successfully");
      fetchAnnouncements();
    } catch (error) {
      console.error("Error updating announcement:", error);
      toast.error("Failed to update announcement. Please try again later.");
    }
  };

  return (
    <div>
      <Sidebar />
      <div
        className="announcement-container"
        style={{ marginTop: "3.2%", marginLeft: "30%" }}
      >
        {announcements.map((singleAnnouncement, index) => (
          <AnnouncementCard
            key={singleAnnouncement._id}
            announcements={singleAnnouncement}
            onPost={() => handleApply(singleAnnouncement._id, "accepted")}
            onReject={() => handleApply(singleAnnouncement._id, "rejected")}
          />
        ))}
      </div>
    </div>
  );
};

export default ManagerAnnouncePage;
