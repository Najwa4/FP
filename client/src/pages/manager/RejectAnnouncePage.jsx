import React, { useState, useEffect } from "react";
import AnnouncementCard from "../../components/manager/AnnouncementCard";
import "../../styles/Announcementpage.css";
import { toast } from "react-toastify";
import { getRequest } from "../../services/api";
import Sidebar from "../../components/manager/ManagerSidebar";

const ManagerAnnouncePage = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await getRequest("/announcements/rejected");
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

    fetchAnnouncements();
  }, []);

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
          />
        ))}
      </div>
    </div>
  );
};

export default ManagerAnnouncePage;
