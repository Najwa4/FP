import React, { useState, useEffect } from "react";
import { getRequest, putRequest } from "../../services/api";
import AppTable from "../../components/staff/AppTable";
import Search from "../../components/staff/Search";
import Sidebar from "../../components/staff/Sidebar";
import { toast } from "react-toastify";
import "../../styles/Table.css";

const FindAppPage = () => {
  const [applicant, setApplicant] = useState([]);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const response = await getRequest("/applicants/find");
      if (response && response.data) {
        setApplicant(response.data);
        console.log(response.data);
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
        fetchApplicants();
      } else {
        const encodedQuery = encodeURIComponent(searchQuery);
        const response = await getRequest(
          `/applicants/findApp/${encodedQuery}`
        );
        if (response && response.data) {
          setApplicant(response.data);
          console.log(response.data);
        } else {
          setApplicant([]);
          console.error("No data found");
        }
      }
    } catch (error) {
      console.error("Error fetching applicant:", error);
    }
  };

  const handleApply = async (announcementId, _id, Applicant_status) => {
    try {
      const encodedApplicantId = encodeURIComponent(_id);
      await putRequest(`/applicants/${announcementId}/${encodedApplicantId}`, {
        Applicant_status,
      });
      console.log(
        "Announcement Id:",
        announcementId,
        "Applicant Id:",
        _id,
        "statusd:",
        Applicant_status
      );
      toast.success("Updated successfully");
      fetchApplicants();
    } catch (error) {
      console.error("Error updating rest request:", error);
      toast.error("Failed to update rest request. Please try again later.");
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="page">
        <h1>Find Applicant</h1>
        <Search onSearch={handleSearch} />
        {applicant.length > 0 ? (
          <AppTable
            data={applicant}
            onAccept={(announcementId, _id) =>
              handleApply(announcementId, _id, "accepted")
            }
            onReject={(announcementId, _id) =>
              handleApply(announcementId, _id, "rejected")
            }
          />
        ) : (
          <p>No applicants found</p>
        )}
      </div>
    </div>
  );
};

export default FindAppPage;
