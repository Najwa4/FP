import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/RegistrationForm.css";
import { postRequest } from "../../services/api";
import { toast } from "react-toastify";

const AddAnnouncePage = () => {
  const [announcData, setAnnouncData] = useState({
    department: "",
    position: "",
    jobDescription: "",
    jobRequirements: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnnouncData({ ...announcData, [name]: value || "" });
  };

  const handleApply = async (event) => {
    event.preventDefault();
    try {
      // Department validation
      const nameRegex = /^[A-Za-z]+$/;
      if (!nameRegex.test(announcData.department)) {
        toast.error("Department should contain only alphabets.");
        return;
      }

      const response = await postRequest(
        "/announcements/employee-request",
        announcData
      );
      if (response) {
        setAnnouncData({
          department: "",
          position: "",
          jobDescription: "",
          jobRequirements: "",
        });
        toast.success("announcement created successfully!");
        console.log(response);
      } else {
        setAnnouncData({
          department: "",
          position: "",
          jobDescription: "",
          jobRequirements: "",
        });
        toast.error(
          "Failed to create new announcement. Please make sure you fill out all fields correctly."
        );
      }
    } catch (error) {
      console.error("Error creating announcement:", error);
    }
  };

  return (
    <form onSubmit={handleApply} className="registration-form">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Department"
            name="department"
            required
            fullWidth
            margin="normal"
            className="form-field"
            value={announcData.department}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Position"
            name="position"
            value={announcData.position}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            className="form-field"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Job Description"
            name="jobDescription"
            value={announcData.jobDescription}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            className="form-field"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Job Requirements"
            name="jobRequirements"
            value={announcData.jobRequirements}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            className="form-field"
          ></TextField>
        </Grid>

        <Grid item xs={12} sm={1}></Grid>
      </Grid>
      <Grid item xs={12} sm={1}>
        <div
          className="form-actions"
          style={{ marginLeft: "4.5%", marginTop: "3.5%" }}
        >
          <Button
            variant="contained"
            type="submit"
            className="file-upload-button"
          >
            save
          </Button>
        </div>
      </Grid>
    </form>
  );
};

export default AddAnnouncePage;
