import React, { useState } from "react";
import "../../styles/TableComponent.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Card, CardContent, Typography } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { putRequest } from "../../services/api";
import { toast } from "react-toastify";

const UpdateTestDayComponent = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [absenceDay, setAbsenceDate] = useState(new Date());

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDateChange = async (date) => {
    setAbsenceDate(date);
  };

  const handleUpdate = async () => {
    try {
      // Check if absenceDay is before the current day
      const currentDate = new Date();
      if (absenceDay > currentDate) {
        toast.error("Absence day cannot be in the future.");
        return;
      }

      let encodeID = encodeURIComponent(selectedUser._id);
      const response = await putRequest(
        `/employees/updateDaysOfAbsence/${encodeID}`,
        { daysOfAbsence: absenceDay }
      );
      if (response) {
        toast.success("Absence day updated successfully!");
        console.log(absenceDay, selectedUser);
        handleCloseModal();
      } else {
        toast.error("Failed to update absence day. Please try again.");
      }
    } catch (error) {
      console.error("Error updating absence day:", error);
      toast.error("Failed to update absence day. Please try again later.");
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>BD</th>
            <th>Marital Status</th>
            <th>Department</th>
            <th>College</th>
            <th>Days Of Absence</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={index}>
              <td>{user._id}</td>
              <td>{user.fullName}</td>
              <td>{user.gender}</td>
              <td>{user.dateOfBirth}</td>
              <td>{user.maritalStatus}</td>
              <td>{user.department}</td>
              <td>{user.college}</td>
              <td>{user.daysOfAbsence}</td>
              <td>
                <button onClick={() => handleOpenModal(user)}>Update</button>
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
                Update Day Of Absence
              </Typography>
              <DatePicker selected={absenceDay} onChange={handleDateChange} />
              <button onClick={handleUpdate}>Update</button>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateTestDayComponent;
