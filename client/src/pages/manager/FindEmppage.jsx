import React, { useState, useEffect } from "react";
import { getRequest } from "../../services/api";
import EmpTable from "../../components/manager/EmpTable";
import Search from "../../components/manager/Search";
import Sidebar from "../../components/manager/ManagerSidebar";

const FindEmployeePage = () => {
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
      <h1>Find Employee</h1>
      <Sidebar />
      <Search onSearch={handleSearch} />
      <EmpTable data={user} />
    </div>
  );
};

export default FindEmployeePage;
