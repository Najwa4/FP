import React, { useState } from "react";
import "../../styles/TableComponent.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Card, CardContent, Typography, Button } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { putRequest } from "../../services/api";
import { toast } from "react-toastify";

const UpdateTestDayComponent = ({ data }) => {
  // Corrected component name
  const [openModal, setOpenModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [testDay, setTestDate] = useState(new Date());

  const handleOpenModal = (announcement) => {
    setSelectedAnnouncement(announcement);
    setOpenModal(true);
  };

  const handleCloseModal = async () => {
    try {
      // Validation: Test day cannot be in the past
      const currentDate = new Date();
      if (testDay < currentDate) {
        toast.error("Test day cannot be in the past.");
        return;
      }

      // Validation: Test day should be before 6 months from the current day
      const sixMonthsFromNow = new Date();
      sixMonthsFromNow.setMonth(currentDate.getMonth() + 6);
      if (testDay > sixMonthsFromNow) {
        toast.error("Test day should be before 6 months from the current day.");
        return;
      }

      const response = await putRequest(
        `/announcements/Test-Day/${selectedAnnouncement._id}`,
        { testDay }
      );
      if (response) {
        toast.success("Test day updated successfully!");
        console.log(testDay, selectedAnnouncement._id);
      } else {
        toast.error("Failed to update test day. Please try again.");
      }
    } catch (error) {
      console.error("Error updating test day:", error);
      toast.error("Failed to update test day. Please try again later.");
    }
    setOpenModal(false);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Department</th>
            <th>Position</th>
            <th>Job Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((announcement, index) => (
            <tr key={index}>
              <td>{announcement._id}</td>
              <td>{announcement.department}</td>
              <td>{announcement.position}</td>
              <td>{announcement.jobDescription}</td>
              <td>
                <button
                  onClick={() => handleOpenModal(announcement)}
                  style={{ width: "120px", borderRadius: "5px" }}
                >
                  Set Test Day
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            width: 400,
            height: 700,
            margin: "auto",
            marginTop: "20vh",
            borderRadius: "20px",
          }}
        >
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                Announcement Test Day
              </Typography>
              <DatePicker
                selected={testDay}
                onChange={(date) => setTestDate(date)}
              />
              <Button
                variant="contained"
                onClick={handleCloseModal}
                style={{
                  background: "#4CAF50",
                  marginLeft: "3%",
                  borderRadius: "5px",
                }}
              >
                Update
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateTestDayComponent; // Corrected export name
