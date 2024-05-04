import React, { useState, useEffect } from "react";
import Profile from "../../components/manager/ProfileCard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getRequest } from "../../services/api";
import Sidebar from "../../components/manager/ManagerSidebar";
import "../../styles/Table.css";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getRequest("/users");
        if (response && response.data) {
          setUsers(response.data);
          console.log(response.data);
        } else {
          toast.error("No data found.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data. Please try again later.");
      }
    };

    fetchProfile();
  }, []);

  const handleReport = () => {
    navigate("/Rep");
  };

  const handleChangePass = () => {
    navigate("/Pass");
  };

  return (
    <div>
      <Sidebar />
      <div className="page" style={{ marginTop: "3.2%" }}>
        <Profile
          key={users._id}
          users={users}
          onReport={() => handleReport()}
          onChange={() => handleChangePass()}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
