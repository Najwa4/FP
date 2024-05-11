import React, { useState } from "react";
import { postRequest } from "../../services/api";
import { toast } from "react-toastify";
import "../../styles/QuitJob.css";

const RestReq = () => {
  const [reason, setReason] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleCreateQuitReq = async (event) => {
    event.preventDefault();
    try {
      const requestData = {
        reason,
        startDate,
        endDate,
      };
      console.log(requestData);

      // Validate start date and end date
      const currentDate = new Date();
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);

      if (startDateObj <= currentDate || endDateObj <= currentDate) {
        toast.error("Start and end dates must be in the future");
        return;
      }

      if (startDateObj >= endDateObj) {
        toast.error("Start date must be before end date");
        return;
      }

      // Retrieve token from local storage
      const token = localStorage.getItem("token");
      console.log("Token:", token); // Add this line to check the token value
      if (!token) {
        toast.error("No token found");
        return;
      }

      // Extract _id from token
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      console.log("Decoded Token:", decodedToken.userId); // Add this line to check the decoded token
      const _id = decodedToken.userId;

      let encodedID = encodeURIComponent(_id);
      const response = await postRequest(`/rest/${encodedID}`, requestData);
      if (response) {
        toast.success("Request created successfully!");
        setReason("");
        setStartDate("");
        setEndDate("");
      } else {
        toast.error(
          "Failed to create request. Please ensure that all fields are filled in correctly."
        );
        setReason("");
        setStartDate("");
        setEndDate("");
      }
    } catch (error) {
      console.error("Error creating request:", error);
    }
  };

  return (
    <div className="form-containerD">
      <form onSubmit={handleCreateQuitReq} className="my-formD">
        <div className="formD">
          <label htmlFor="reason" style={{ paddingRight: "7%" }}>
            Reason:
          </label>
          <input
            type="text"
            id="reason"
            name="reason"
            value={reason}
            onChange={(event) => setReason(event.target.value.trim())}
            required
            style={{ width: "50%" }}
          />
        </div>
        <div className="formD">
          <label htmlFor="startDate" style={{ paddingRight: "5%" }}>
            Start Date:
          </label>
          <input
            type="text"
            id="startDate"
            name="startDate"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value.trim())}
            required
            style={{ width: "50%" }}
          />
        </div>
        <div className="formD">
          <label htmlFor="endDate" style={{ paddingRight: "5%" }}>
            End Date:
          </label>
          <input
            type="text"
            id="endDate"
            name="endDate"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value.trim())}
            required
            style={{ width: "50%" }}
          />
        </div>
        <button type="submit" style={{ marginTop: "3%" }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default RestReq;
