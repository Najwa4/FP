import React, { useState, useRef } from 'react';
import { TextField, Button, Grid, MenuItem } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import '../styles/UpdateUserForm.css';
import { putRequest } from '../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UpdateUserForm = ({ userData }) => {
  const [formData, setFormData] = useState({
    firstName: userData.firstName,
    middleName: userData.middleName,
    lastName: userData.lastName,
    gender: userData.gender,
    maritalStatus: userData.maritalStatus,
    dateOfBirth: userData.dateOfBirth ? new Date(userData.dateOfBirth) : null,
    location: userData.location,
    emailAddress: userData.emailAddress,
    phoneNumber: userData.phoneNumber,
    contactPersonname: userData.contactPersonname,
    contactPersonphoneNumber: userData.contactPersonphoneNumber,
    highestLevel: userData.highestLevel,
    university: userData.university,
    graduationDate: userData.graduationDate
      ? new Date(userData.graduationDate)
      : null,
    fieldOfStudy: userData.fieldOfStudy,
    previousOrganization: userData.previousOrganization,
    prevStartDate: userData.prevStartDate
      ? new Date(userData.prevStartDate)
      : null,
    prevEndDate: userData.prevEndDate ? new Date(userData.prevEndDate) : null,
    referencesName: userData.referencesName,
    referencesPosition: userData.referencesPosition,
    referencesEmail: userData.referencesEmail,
    referencesPhone: userData.referencesPhone,
    skills: userData.skills,
    file: null,
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGraduationDatePicker, setShowGraduationDatePicker] =
    useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trim() || '' });
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

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      // Validate form data
      // ...

      // Update user data
      const response = await putRequest(`/users/${userData.id}`, formData);
      if (response) {
        toast.success('User information updated successfully!');
        navigate('/profile');
      } else {
        toast.error('Failed to update user information. Please try again.');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('An error occurred while updating user information.');
    }
  };

  return (
    <form onSubmit={handleUpdate} className="update-user-form">
      <Grid container spacing={3}>
        {/* Form fields similar to PersonalInformationPage, 
        but with values from userData */}
        <Grid item xs={12} sm={4}>
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            className="form-field"
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
            label="phone Number"
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
            label="Emergency contact name"
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
            label="Emergency contact number"
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
            label="education highest level"
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
            label="Graduated from"
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
            label="Field of Study"
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
            label="The previous institution where you worked, if any"
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
            label="Previous institution started work date"
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
            label="Previous institution ended work date"
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
            label="References name"
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
            label="References position"
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
            label="references email"
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
            label="references Phone"
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
            label="skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            fullWidth
            margin="normal"
            className="form-field"
          />
        </Grid>
        <Grid item xs={12} sm={1}></Grid>
        <div className="file-upload-container">
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
      <div className="form-actions">
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="submit-button"
        >
          Update User
        </Button>
      </div>
    </form>
  );
};

export default UpdateUserForm;