import React, { useState, useEffect } from "react";
import UpdateUser from "../../components/staff/UpdateUserForm";
import Sidebar from "../../components/staff/Sidebar";
import Search from "../../components/manager/Search";
import "../../styles/Table.css";
import { getRequest } from "../../services/api";

const UpdateUserPage = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await getRequest("/employees");
      if (response && response.data) {
        setUser(response.data);
      } else {
        console.error("No data found");
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleSearch = async (searchQuery) => {
    try {
      if (!searchQuery.trim()) {
        // If searchQuery is empty, fetch all employees
        fetchEmployees();
      } else {
        let encodedQuery = encodeURIComponent(searchQuery);
        const response = await getRequest(`/users/find/${encodedQuery}`);
        if (response && response.data) {
          setUser([response.data]);
        } else {
          console.error("No data found");
        }
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="page">
        <h1>Update Employee Information</h1>
        <Search onSearch={handleSearch} />
        {user.length > 0 ? (
          <UpdateUser data={user} />
        ) : (
          <p>No announcements found</p>
        )}
      </div>
    </div>
  );
};

export default UpdateUserPage;
