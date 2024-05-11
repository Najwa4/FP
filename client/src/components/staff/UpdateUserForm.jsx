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
  MenuItem,
} from "@mui/material";
import { putRequest } from "../../services/api";
import { toast } from "react-toastify";

const UpdateUser = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleOpenModal = (user) => {
    setSelectedEmployee(user);
    setFormData({
      fullName: user.fullName,
      gender: user.gender,
      maritalStatus: user.maritalStatus,
      dateOfBirth: user.dateOfBirth,
      location: user.location,
      emailAddress: user.emailAddress,
      phoneNumber: user.phoneNumber,
      contactPersonname: user.contactPersonname,
      contactPersonphoneNumber: user.contactPersonphoneNumber,
      highestLevel: user.highestLevel,
      university: user.university,
      graduationDate: user.graduationDate,
      fieldOfStudy: user.fieldOfStudy,
      previousOrganization: user.previousOrganization,
      prevStartDate: user.prevStartDate,
      prevEndDate: user.prevEndDate,
      referencesName: user.referencesName,
      referencesPosition: user.referencesPosition,
      referencesEmail: user.referencesEmail,
      referencesPhone: user.referencesPhone,
      skills: user.skills,
      hireDate: user.hireDate,
      salary: user.salary,
      role: user.role,
      account_status: user.account_status,
      department: user.department,
      college: user.college,
      password: user.password,
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
      // Date of Birth validation
      const currentDate = new Date();
      const minBirthDate = new Date(
        currentDate.getFullYear() - 18,
        currentDate.getMonth(),
        currentDate.getDate()
      );
      const salaryRegex = /^\d+(\.\d{1,2})?$/;

      if (formData.dateOfBirth > minBirthDate) {
        toast.error("You should be above 18 years old to apply");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(formData.emailAddress)) {
        toast.error("Please enter a valid email address for Email");
        return;
      }

      // Check if referencesEmail is provided and apply validation if it is
      if (
        formData.referencesEmail &&
        !emailRegex.test(formData.referencesEmail)
      ) {
        toast.error("Please enter a valid email address for References Email");
        return;
      }

      // Phone number validation
      const phoneRegex = /^\d{10}$/;

      if (!phoneRegex.test(formData.phoneNumber)) {
        toast.error(
          "Phone number should contain 10 digits without any alphabets"
        );
        return;
      }

      if (
        formData.contactPersonphoneNumber &&
        !phoneRegex.test(formData.contactPersonphoneNumber)
      ) {
        toast.error(
          "Emergency contact phone number should contain 10 digits without any alphabets"
        );
        return;
      }

      // Check if referencesPhone is provided and apply validation if it is
      if (
        formData.referencesPhone &&
        !phoneRegex.test(formData.referencesPhone)
      ) {
        toast.error(
          "References phone number should contain 10 digits without any alphabets"
        );
        return;
      }

      // Date validation
      if (
        formData.prevStartDate > currentDate ||
        formData.prevEndDate > currentDate
      ) {
        toast.error("work start and end dates are not correct.");
        return;
      }

      // Date validation
      if (formData.hireDate > currentDate) {
        toast.error("hire date are not correct.");
        return;
      }

      // Date validation for prevStartDate and prevEndDate
      if (formData.prevStartDate > formData.prevEndDate) {
        toast.error("Work start date should come before the end date.");
        return;
      }

      // Date validation for graduationDate
      if (formData.graduationDate > currentDate) {
        toast.error("Graduation date should be in the past");
        return;
      }

      // Salary validation (optional)
      if (
        formData.salary?.trim() !== "" &&
        !salaryRegex.test(formData.salary)
      ) {
        toast.error("Salary should contain only numbers.");
        return;
      }

      // First name, middle name, last name validation
      const nameRegex = /^[A-Za-z]+$/;
      if (
        !nameRegex.test(formData.firstName) ||
        !nameRegex.test(formData.middleName) ||
        !nameRegex.test(formData.lastName)
      ) {
        toast.error(
          "First name, middle name, and last name should contain only alphabets."
        );
        return;
      }

      const encodedUser = encodeURIComponent(_id);
      const response = await putRequest(`/users/upda/${encodedUser}`, formData);
      if (response && response.data) {
        window.location.reload();
        // navigate("/UpdateUser");
        console.log("User updated:", _id, "data:", formData);
        toast.success("User updated successfully");
      } else {
        console.error("No data returned after updating User");
        toast.error("Failed to update User. Please try again later.");
      }
    } catch (error) {
      console.error("Error updating User:", error);
      toast.error("Failed to update User. Please try again later.");
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
                Update User
              </Typography>
              <form onSubmit={handleApply}>
                <TextField
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Gender"
                  name="gender"
                  Value={formData.gender || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  select
                  defaultValue={formData.gender || ""}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </TextField>
                <TextField
                  label="Marital Status"
                  name="maritalStatus"
                  value={formData.maritalStatus || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  select
                  defaultValue={formData.maritalStatus || ""}
                >
                  <MenuItem value="single">Single</MenuItem>
                  <MenuItem value="married">Married</MenuItem>
                  <MenuItem value="divorced">Divorced</MenuItem>
                  <MenuItem value="widowed">Widowed</MenuItem>
                </TextField>
                <TextField
                  label="Date of Birth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Location"
                  name="location"
                  value={formData.location || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Email"
                  name="emailAddress"
                  value={formData.emailAddress || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Contact Person Name"
                  name="contactPersonname"
                  value={formData.contactPersonname || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Contact Person Phone Number"
                  name="contactPersonphoneNumber"
                  value={formData.contactPersonphoneNumber || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Field of Study"
                  name="fieldOfStudy"
                  value={formData.fieldOfStudy || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Education highest level"
                  name="highestLevel"
                  value={formData.highestLevel || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  select
                  defaultValue={formData.highestLevel || ""}
                >
                  <MenuItem value="Bachelor's Degree">
                    Bachelor's Degree
                  </MenuItem>
                  <MenuItem value="Master's Degree">Master's Degree</MenuItem>
                  <MenuItem value="Doctorate">Doctorate</MenuItem>
                </TextField>
                <TextField
                  label="University"
                  name="university"
                  value={formData.university || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Graduation Date Name"
                  name="graduationDate"
                  value={formData.graduationDate || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Hire Date"
                  name="hireDate"
                  value={formData.hireDate || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Salary"
                  name="salary"
                  value={formData.salary || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Days of Absence"
                  name="daysOfAbsence"
                  value={formData.daysOfAbsence || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Account Status"
                  name="account_status"
                  value={formData.account_status || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  select
                  defaultValue={formData.account_status || ""}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </TextField>
                <TextField
                  label="Role"
                  name="role"
                  value={formData.role || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  select
                  defaultValue={formData.role || ""}
                >
                  <MenuItem value="employee">Employee</MenuItem>
                  <MenuItem value="hr_manager">Hr Manager</MenuItem>
                  <MenuItem value="hr_staff">Hr Staff</MenuItem>
                  <MenuItem value="head">Head</MenuItem>
                  <MenuItem value="dean">Dean</MenuItem>
                </TextField>
                <TextField
                  label="Department"
                  name="department"
                  value={formData.department || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="College"
                  name="college"
                  value={formData.college || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Password"
                  name="password"
                  value={formData.password || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <Button
                  variant="contained"
                  style={{ background: "#4CAF50", marginTop: "2%" }}
                  onClick={(e) => handleApply(e, selectedEmployee._id)}
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
