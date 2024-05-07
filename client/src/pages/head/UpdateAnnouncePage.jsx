import React, { useState, useEffect } from "react";
import UpdateAnnounce from "../../components/head/UpdateAnnounce";
import Sidebar from "../../components/head/Sidebar";
import Search from "../../components/head/Search";
import "../../styles/Table.css";
import { getRequest } from "../../services/api";

const UpdateUserPage = () => {
  const [announce, setAnnounce] = useState([]);

  useEffect(() => {
    fetchAnnouncement();
  }, []);

  const fetchAnnouncement = async () => {
    try {
      const response = await getRequest("/announcements");
      if (response && response.data) {
        setAnnounce(response.data);
      } else {
        console.error("No data found");
      }
    } catch (error) {
      console.error("Error fetching announcement:", error);
    }
  };

  const handleSearch = async (searchQuery) => {
    try {
      if (!searchQuery.trim()) {
        // If searchQuery is empty, fetch all employees
        fetchAnnouncement();
      } else {
        let encodedQuery = encodeURIComponent(searchQuery);
        const response = await getRequest(
          `/announcements/find/${encodedQuery}`
        );
        if (response && response.data) {
          setAnnounce([response.data]);
        } else {
          console.error("No data found");
        }
      }
    } catch (error) {
      console.error("Error fetching announcement:", error);
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="page">
        <h1>Update Employee Information</h1>
        <Search onSearch={handleSearch} />
        {announce.length > 0 ? (
          <UpdateAnnounce data={announce} />
        ) : (
          <p>No announcements found</p>
        )}
      </div>
    </div>
  );
};

export default UpdateUserPage;
