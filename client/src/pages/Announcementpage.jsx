import React, { useState, useEffect } from "react";
import AnnouncementCard from "../components/AnnouncementCard";
import { useNavigate } from "react-router-dom";
import "../styles/Announcementpage.css";
import { toast } from "react-toastify";
import { getRequest } from "../services/api";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AnnouncementPage = () => {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await getRequest("/announcements/accepted");
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

  const handleApply = (announcementId) => {
    navigate("/personal-information", { state: { announcementId } });
  };

  return (
    <div>
      <Header />
      <div className="announcement-container">
        {announcements.map((singleAnnouncement, index) => (
          <AnnouncementCard
            key={singleAnnouncement._id}
            announcements={singleAnnouncement}
            onApply={() => handleApply(singleAnnouncement._id)}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default AnnouncementPage;
