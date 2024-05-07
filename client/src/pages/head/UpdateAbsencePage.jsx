import React, { useState, useEffect } from "react";
import { getRequest } from "../../services/api";
import UpdateTestDayComponent from "../../components/head/updateAbsence";
import Search from "../../components/staff/Search";
import Sidebar from "../../components/head/Sidebar";
import "../../styles/Table.css";

const FindEmpPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getRequest("/employees");
      if (response && response.data) {
        setUsers(response.data);
        console.log(response.data);
      } else {
        console.error("No data found");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSearch = async (searchQuery) => {
    try {
      if (!searchQuery.trim()) {
        // If searchQuery is empty, fetch all employees
        fetchUsers();
      } else {
        let encodedQuery = encodeURIComponent(searchQuery);
        const response = await getRequest(`/users/find/${encodedQuery}`);
        console.log(response && response.data);
        if (response && response.data) {
          setUsers([response.data]);
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
        <h1>Update Absence Day</h1>
        <Search onSearch={handleSearch} />
        {users.length > 0 ? (
          <UpdateTestDayComponent data={users} />
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
};

export default FindEmpPage;
