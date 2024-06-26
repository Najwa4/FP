import React, { useState, useRef } from "react";
import { TextField, Button, Grid, MenuItem } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import "../../styles/RegistrationForm.css";
import { postRequest } from "../../services/api";
import { toast } from "react-toastify";

const AddUserPage = () => {
  const fileInputRef = useRef(null);

  const initialFormData = {
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    maritalStatus: "",
    dateOfBirth: null,
    location: "",
    emailAddress: "",
    phoneNumber: "",
    contactPersonname: "",
    contactPersonphoneNumber: "",
    highestLevel: "",
    university: "",
    graduationDate: "",
    fieldOfStudy: "",
    previousOrganization: "",
    prevStartDate: null,
    prevEndDate: null,
    referencesName: "",
    referencesPosition: "",
    referencesEmail: "",
    referencesPhone: "",
    skills: "",
    hireDate: "",
    salary: "",
    role: "",
    account_status: "",
    department: "",
    college: "",
    username: "",
    password: "",
    file: null,
  };

  const [formData, setFormData] = useState(initialFormData);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGraduationDatePicker, setShowGraduationDatePicker] =
    useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showHireDatePicker, setShowHireDatePicker] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value || "" });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, dateOfBirth: date });
  };

  const handleGraduationDateChange = (date) => {
    setFormData({ ...formData, graduationDate: date });
  };

  const handleStartDateChange = (date) => {
    setFormData({ ...formData, prevStartDate: date });
  };

  const handleEndDateChange = (date) => {
    setFormData({ ...formData, prevEndDate: date });
  };

  const handleHireDateChange = (date) => {
    setFormData({ ...formData, hireDate: date });
  };

  const handleCalendarClick = () => {
    setShowDatePicker(true);
  };

  const handleGraduationCalendarClick = () => {
    setShowGraduationDatePicker(true);
  };

  const handleStartCalendarClick = () => {
    setShowStartDatePicker(true);
  };

  const handleEndCalendarClick = () => {
    setShowEndDatePicker(true);
  };

  const handleHireCalendarClick = () => {
    setShowHireDatePicker(true);
  };

  const handleApply = async (event) => {
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
      if (formData.salary.trim() !== "" && !salaryRegex.test(formData.salary)) {
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

      // References name validation (if provided)
      const rifNameRegex = /^[A-Za-z]+$/;
      if (
        formData.referencesName &&
        !rifNameRegex.test(formData.referencesName)
      ) {
        toast.error("References name should contain only alphabets.");
        return;
      }

      // Contact name validation
      const conNameRegex = /^[A-Za-z]+$/;
      if (!conNameRegex.test(formData.contactPersonname)) {
        toast.error("Contact name should contain only alphabets.");
        return;
      }

      const response = await postRequest("/users", formData);
      if (response) {
        setFormData(initialFormData);
        toast.success("user created successfully!");
      } else {
        toast.error(
          "Failed to create new user. Please make sure you fill out all fields correctly."
        );
      }
    } catch (error) {
      console.error("Error creating applicant:", error);
    }
  };

  return (
    <form onSubmit={handleApply} className="registration-form">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="First Name"
            name="firstName"
            required
            fullWidth
            margin="normal"
            className="form-field"
            value={formData.firstName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Middle Name"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            className="form-field"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            className="form-field"
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            className="form-field"
            select
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            label="Marital Status"
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            className="form-field"
            select
          >
            <MenuItem value="single">Single</MenuItem>
            <MenuItem value="married">Married</MenuItem>
            <MenuItem value="divorced">Divorced</MenuItem>
            <MenuItem value="widowed">Widowed</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label="Date of Birth"
            value={
              formData.dateOfBirth ? formData.dateOfBirth.toDateString() : ""
            }
            onClick={handleCalendarClick}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <Button onClick={handleCalendarClick}>
                  <CalendarTodayIcon />
                </Button>
              ),
            }}
            className="form-field"
          />
          {showDatePicker && (
            <div className="date-picker-container">
              <DatePicker
                selected={formData.dateOfBirth}
                onChange={handleDateChange}
                className="date-picker"
                dateFormat="yyyy/MM/dd"
                showYearDropdown
                scrollableYearDropdown
              />
            </div>
          )}
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            className="form-field"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Email"
            name="emailAddress"
            type="email"
            value={formData.emailAddress}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            className="form-field"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            className="form-field"
          />
        </Grid>
        <Grid item xs={12} sm={4}></Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Emergency Contact Name"
            name="contactPersonname"
            value={formData.contactPersonname}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            className="form-field"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Emergency Contact Number"
            name="contactPersonphoneNumber"
            value={formData.contactPersonphoneNumber}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            className="form-field"
          />
        </Grid>
        <Grid item xs={12} sm={4}></Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Education Highest Level"
            name="highestLevel"
            value={formData.highestLevel}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            className="form-field"
            select
          >
            <MenuItem value="Bachelor's Degree">Bachelor's Degree</MenuItem>
            <MenuItem value="Master's Degree">Master's Degree</MenuItem>
            <MenuItem value="Doctorate">Doctorate</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Graduated From"
            name="university"
            value={formData.university}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            className="form-field"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Graduation Date"
            name="graduationDate"
            value={
              formData.graduationDate
                ? formData.graduationDate.toDateString()
                : ""
            }
            onClick={handleGraduationCalendarClick}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <Button onClick={handleGraduationCalendarClick}>
                  <CalendarTodayIcon />
                </Button>
              ),
            }}
            className="form-field"
          />
          {showGraduationDatePicker && (
            <div className="date-picker-container">
              <DatePicker
                selected={formData.graduationDate}
                onChange={handleGraduationDateChange}
                className="date-picker"
                dateFormat="yyyy/MM/dd"
                showYearDropdown
                scrollableYearDropdown
              />
            </div>
          )}
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Field Of Study"
            name="fieldOfStudy"
            value={formData.fieldOfStudy}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            className="form-field"
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            label="Previous Institution"
            name="previousOrganization"
            value={formData.previousOrganization}
            onChange={handleChange}
            fullWidth
            margin="normal"
            className="form-field"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Previous Institution Started Work Date"
            name="prevStartDate"
            value={
              formData.prevStartDate
                ? formData.prevStartDate.toDateString()
                : ""
            }
            onClick={handleStartCalendarClick}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <Button onClick={handleStartCalendarClick}>
                  <CalendarTodayIcon />
                </Button>
              ),
            }}
            className="form-field"
          />
          {showStartDatePicker && (
            <div className="date-picker-container">
              <DatePicker
                selected={formData.prevStartDate}
                onChange={handleStartDateChange}
                className="date-picker"
                dateFormat="yyyy/MM/dd"
                showYearDropdown
                scrollableYearDropdown
              />
            </div>
          )}
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Previous Institution Ended Work Date"
            name="prevEndDate"
            value={
              formData.prevEndDate ? formData.prevEndDate.toDateString() : ""
            }
            onClick={handleEndCalendarClick}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <Button onClick={handleEndCalendarClick}>
                  <CalendarTodayIcon />
                </Button>
              ),
            }}
            className="form-field"
          />
          {showEndDatePicker && (
            <div className="date-picker-container">
              <DatePicker
                selected={formData.prevStartDate}
                onChange={handleEndDateChange}
                className="date-picker"
                dateFormat="yyyy/MM/dd"
                showYearDropdown
                scrollableYearDropdown
              />
            </div>
          )}
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="References Name"
            name="referencesName"
            value={formData.referencesName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            className="form-field"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="References Position"
            name="referencesPosition"
            value={formData.referencesPosition}
            onChange={handleChange}
            fullWidth
            margin="normal"
            className="form-field"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="References Email"
            name="referencesEmail"
            value={formData.referencesEmail}
            onChange={handleChange}
            fullWidth
            margin="normal"
            className="form-field"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="References Phone"
            name="referencesPhone"
            value={formData.referencesPhone}
            onChange={handleChange}
            fullWidth
            margin="normal"
            className="form-field"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            fullWidth
            margin="normal"
            className="form-field"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Hire Date"
            name="hireDate"
            value={formData.hireDate ? formData.hireDate.toDateString() : ""}
            onClick={handleHireCalendarClick}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <Button onClick={handleHireCalendarClick}>
                  <CalendarTodayIcon />
                </Button>
              ),
            }}
            className="form-field"
          />
          {showHireDatePicker && (
            <div className="date-picker-container">
              <DatePicker
                selected={formData.hireDate}
                onChange={handleHireDateChange}
                className="date-picker"
                dateFormat="yyyy/MM/dd"
                showYearDropdown
                scrollableYearDropdown
              />
            </div>
          )}
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            fullWidth
            margin="normal"
            className="form-field"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            className="form-field"
            select
          >
            <MenuItem value="employee">Employee</MenuItem>
            <MenuItem value="hr_manager">Hr Manager</MenuItem>
            <MenuItem value="hr_staff">Hr Staff</MenuItem>
            <MenuItem value="head">Head</MenuItem>
            <MenuItem value="dean">Dean</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Account Status"
            name="account_status"
            value={formData.account_status}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            className="form-field"
            select
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            className="form-field"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="College"
            name="college"
            value={formData.college}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            className="form-field"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            className="form-field"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            className="form-field"
          />
        </Grid>
        <Grid item xs={12} sm={1}></Grid>
        <div className="file-upload-container" style={{ marginLeft: "1.5%" }}>
          <Button
            variant="contained"
            component="label"
            className="file-upload-button"
            onClick={() => fileInputRef.current.click()}
          >
            Upload File
            <input
              type="file"
              hidden
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </Button>
        </div>
      </Grid>
      <Grid item xs={12} sm={1}>
        <div
          className="form-actions"
          style={{ marginLeft: "21.5%", marginTop: "-2.4%" }}
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

export default AddUserPage;
