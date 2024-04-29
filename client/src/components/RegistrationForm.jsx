import React, { useState, useRef } from 'react';
import { TextField, Button, IconButton, MenuItem } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import '../styles/RegistrationForm.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    region: '',
    woreda: '',
    zone: '',
    kebele: '',
    gender: '',
    dateOfBirth: null,
    maritalStatus: '',
    file: null,
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFormData({ ...formData, dateOfBirth: date });
  };

  const handleCalendarClick = () => {
    setShowDatePicker(!showDatePicker);
   };
   

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <div className="form-section">
        <TextField
          label="First Name/ሙሉ ስም"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          fullWidth
          margin="dense"
          className="form-field"
        />
        <TextField
          label="Middle Name/የአባት ስም"
          name="middleName"
          value={formData.middleName}
          onChange={handleChange}
          fullWidth
          margin="dense"
          className="form-field"
        />
        <TextField
          label="Last Name/የአያት ስም"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          fullWidth
          margin="dense"
          className="form-field"
        />
      </div>
      <div className="form-section">
        <TextField
          label="Gender/ጾታ"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
          className="form-field"
          select
        >
          <MenuItem value="" disabled>
            Select Gender
          </MenuItem>
          <MenuItem value="F">F</MenuItem>
          <MenuItem value="M">M</MenuItem>
        </TextField>

        <TextField
 label="Date of Birth/የልደት ቀን"
 value={selectedDate ? selectedDate.toDateString() : ''}
 InputProps={{
    readOnly: true,
    endAdornment: (
      <IconButton onClick={handleCalendarClick} className="date-picker-icon">
        <CalendarTodayIcon />
      </IconButton>
    ),
 }}
 className="form-field date-picker"
/>

{showDatePicker && (
 <DatePicker
    selected={selectedDate}
    onChange={handleDateChange}
    onBlur={() => setShowDatePicker(false)}
    className="date-picker"
 />
)}

       
        
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
          <MenuItem value="" disabled>
            Select Marital Status
          </MenuItem>
          <MenuItem value="Single">Single</MenuItem>
          <MenuItem value="Married">Married</MenuItem>
          <MenuItem value="Divorced">Divorced</MenuItem>
          <MenuItem value="Widowed">Widowed</MenuItem>
        </TextField>
      </div>
      <div className="form-section">
        <TextField
          label="Email/ኢሜል"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
          className="form-field"
        />
        <TextField
          label="Phone Number/የስልክ ቁጥር"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
          className="form-field"
        />
      </div>
      <div className="form-section">
        <TextField
          label="Region/ክልል"
          name="region"
          value={formData.region}
          onChange={handleChange}
          required
          margin="normal"
          className="form-field"
        />
        <TextField
          label="Woreda/ወረዳ"
          name="woreda"
          value={formData.woreda}
          onChange={handleChange}
          required
          margin="normal"
          className="form-field"
        />
        <TextField
          label="Zone/ዞን"
          name="zone"
          value={formData.zone}
          onChange={handleChange}
          required
          margin="normal"
          className="form-field"
        />
        <TextField
          label="Kebele/ቀበሌ"
          name="kebele"
          value={formData.kebele}
          onChange={handleChange}
          required
          margin="normal"
          className="form-field"
        />
      </div>
      <div className="file-upload-container">
        <Button variant="contained" component="label" className="file-upload-button">
          Upload File
          <input type="file" hidden onChange={handleFileChange} ref={fileInputRef} />
        </Button>
      </div>
      <div className="form-actions">
        <Button variant="contained" color="primary" type="submit" className="submit-button">
          Register
        </Button>
      </div>
    </form>
  );
};

export default RegistrationForm;