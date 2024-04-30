import React, { useState, useEffect } from "react";
import { getRequest, putRequest } from "../../services/api";
import UpdateTestDayComponent from "../../components/staff/updateTestDay";
import Search from "../../components/staff/Search";
import Sidebar from "../../components/staff/Sidebar";
import { toast } from "react-toastify";
import "../../styles/Table.css";

const FindAnnouncementPage = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await getRequest("/announcements");
      if (response && response.data) {
        setAnnouncements(response.data);
        console.log(response.data);
      } else {
        console.error("No data found");
      }
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  const handleSearch = async (searchQuery) => {
    try {
      if (!searchQuery.trim()) {
        // If searchQuery is empty, fetch all announcements
        fetchAnnouncements();
      } else {
        const encodedQuery = encodeURIComponent(searchQuery);
        const response = await getRequest(
          `/announcements/find/${encodedQuery}`
        );
        if (response && response.data) {
          setAnnouncements([response.data]);
          console.log(response.data);
        } else {
          setAnnouncements([]);
          console.error("No data found");
        }
      }
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  const handleUpdateAnnouncement = async (announcementId, testDay) => {
    try {
      const response = await putRequest(`/announcements/${announcementId}`, {
        testDay,
      });
      if (response && response.data) {
        console.log(
          "Announcement updated:",
          announcementId,
          "Test Day:",
          testDay
        );
        toast.success("Test day updated successfully");
        fetchAnnouncements(); // Refresh the list of announcements
      } else {
        console.error("No data returned after updating announcement");
        toast.error("Failed to update test day. Please try again later.");
      }
    } catch (error) {
      console.error("Error updating test day:", error);
      toast.error("Failed to update test day. Please try again later.");
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="page">
        <h1>Update Test Day</h1>
        <Search onSearch={handleSearch} />
        {announcements.length > 0 ? (
          <UpdateTestDayComponent
            data={announcements}
            onUpdate={(announcementId, status) =>
              handleUpdateAnnouncement(announcementId, status)
            }
          />
        ) : (
          <p>No announcements found</p>
        )}
      </div>
    </div>
  );
};

export default FindAnnouncementPage;
