import React, { useState, useRef } from 'react';
import { TextField, Button, Grid, MenuItem } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import '../styles/RegistrationForm.css';

const PersonalInformationPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: null,
    gender: '',
    maritalStatus: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    referencesPhone: '',
    fieldOfStudy: '', 
    password: '',
    confirmPassword: '',
    file: null,
    graduationDate: null,
    skill: '',
    universty: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGraduationDatePicker, setShowGraduationDatePicker] = useState(false); // New state for graduation date picker
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({...formData, file });
  };

  const handleDateChange = (date) => {
    setFormData({...formData, dateOfBirth: date });
  };

  const handleGraduationDateChange = (date) => {
    setFormData({...formData, graduationDate: date }); // Update graduationDate in formData
  };

  const handleCalendarClick = () => {
    setShowDatePicker(true);
  };

  const handleGraduationCalendarClick = () => {
    setShowGraduationDatePicker(true); // Toggle graduation date picker visibility
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form">
     <Grid container spacing={3}>
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
  <Grid item xs={12} sm={4}>
    <TextField
      label="phone Number"
      name="phoneNumber"
      value={formData.graduationDate}
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
      name="email"
      type="email"
      value={formData.email}
      onChange={handleChange}
      required
      fullWidth
      margin="normal"
      className="form-field"
    />
  </Grid>
  <Grid item xs={12} sm={4}>
    <TextField
      label="references Phone"
      name="referencesPhone"
      value={formData.phoneNumber}
      onChange={handleChange}
      required
      fullWidth
      margin="normal"
      className="form-field"
    />
  </Grid>
  <Grid item xs={12} sm={6}>
    <TextField
      label="Date of Birth"
      value={formData.dateOfBirth? formData.dateOfBirth.toDateString() : ''}
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
  <Grid item xs={12} sm={6}>
  <TextField
    label="Graduation Date"
    name="graduationDate"
    value={formData.graduationDate? formData.graduationDate.toDateString() : ''}
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

  <Grid item xs={12} sm={6}>
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
      <MenuItem value="">Select Gender</MenuItem>
      <MenuItem value="male">Male</MenuItem>
      <MenuItem value="female">Female</MenuItem>
      <MenuItem value="other">Other</MenuItem>
    </TextField>
  </Grid>
  <Grid item xs={12} sm={6}>
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
      <MenuItem value="">Select Marital Status</MenuItem>
      <MenuItem value="single">Single</MenuItem>
      <MenuItem value="married">Married</MenuItem>
      <MenuItem value="divorced">Divorced</MenuItem>
      <MenuItem value="widowed">Widowed</MenuItem>
    </TextField>
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
  <Grid item xs={12} sm={4}>
    <TextField
      label="University"
      name="university"
      value={formData.address}
      onChange={handleChange}
      required
      fullWidth
      margin="normal"
      className="form-field"
    />
  </Grid>
  <Grid item xs={12} sm={4}>
    <TextField
      label="Address"
      name="address"
      value={formData.city}
      onChange={handleChange}
      required
      fullWidth
      margin="normal"
      className="form-field"
    />
  </Grid>
  <Grid item xs={12} sm={4}>
    <TextField
      label="City"
      name="city"
      value={formData.state}
      onChange={handleChange}
      required
      fullWidth
      margin="normal"
      className="form-field"
    />
  </Grid>
  <Grid item xs={12} sm={4}>
    <TextField
      label="State"
      name="state"
      value={formData.zipCode}
      onChange={handleChange}
      required
      fullWidth
      margin="normal"
      className="form-field"
    />
  </Grid>
  <Grid item xs={12} sm={4}>
    <TextField
      label="skills"
      name="skill"
      value={formData.zipCode}
      onChange={handleChange}
      required
      fullWidth
      margin="normal"
      className="form-field"
    />
  </Grid>
</Grid>


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
      <div className="form-actions">
        <Button variant="contained" color="primary" type="submit" className="submit-button">
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default PersonalInformationPage;