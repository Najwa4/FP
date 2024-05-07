import React, { useState } from "react";
import "../../styles/TableComponent.css";
import {
  Modal,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { putRequest } from "../../services/api";
import { toast } from "react-toastify";

const UpdateUser = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const handleOpenModal = (announce) => {
    setSelectedAnnouncement(announce);
    setFormData({
      department: announce.department,
      position: announce.position,
      jobDescription: announce.jobDescription,
      jobRequirements: announce.jobRequirements,
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trim() || "" });
  };

  const handleApply = async (event, _id) => {
    event.preventDefault();
    try {
      const encodedAnnouncement = encodeURIComponent(_id);
      const response = await putRequest(
        `/announcements/update-announcement/${encodedAnnouncement}`,
        formData
      );
      if (response && response.data) {
        console.log("ID:", _id, "data:", formData);
        toast.success("Announcement updated successfully");
        handleCloseModal();
      } else {
        console.error("No data returned after updating Announcement");
        toast.error("Failed to update Announcement. Please try again later.");
      }
    } catch (error) {
      console.error("Error updating Announcement:", error);
      toast.error("Failed to update Announcement. Please try again later.");
    }
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
            <th>Job Requirements</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((announce, index) => (
            <tr key={index}>
              <td>{announce._id}</td>
              <td>{announce.department}</td>
              <td>{announce.position}</td>
              <td>{announce.jobDescription}</td>
              <td>{announce.jobRequirements}</td>
              <td>
                <button onClick={() => handleOpenModal(announce)}>
                  Update
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
            width: 600,
            height: 550,
            paddingLeft: 10,
            margin: "auto",
            marginTop: "20vh",
            borderRadius: "20px",
            overflow: "auto",
          }}
        >
          <Card style={{ padding: "3%" }}>
            <CardContent>
              <Typography variant="h6" component="div">
                Update Announcement
              </Typography>
              <form onSubmit={handleApply}>
                <TextField
                  label="Department"
                  name="department"
                  value={formData.department || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Position"
                  name="position"
                  value={formData.position || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Job Description"
                  name="jobDescription"
                  value={formData.jobDescription || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Job Requirements"
                  name="jobRequirements"
                  value={formData.jobRequirements || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <Button
                  variant="contained"
                  style={{ background: "#4CAF50", marginTop: "2%" }}
                  onClick={(e) => handleApply(e, selectedAnnouncement._id)}
                >
                  Update
                </Button>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateUser;
