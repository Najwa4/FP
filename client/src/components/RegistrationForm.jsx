import React, { useState,useRef  } from 'react';
import { TextField, Button, Select, IconButton, MenuItem } from '@mui/material';
  import DatePicker from 'react-datepicker';
  import 'react-datepicker/dist/react-datepicker.css';
  import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
  
const RegistrationForm = () => {
  const [page, setPage] = useState(1);
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
    Dateofbirth: '',
    birthMonth: '',
    birthYear: '',
    maritalStatus: '',
    file:null,
  });
  
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });
  };

  const [selectedDate, setSelectedDate]=useState(null);
  const [showDataPicker, setShowDatePicker] = useState(false);
  const fileInputRef = useRef(null);
  
  const handleDateChange = (date) => {
   setSelectedDate(date)
  }
  const handleCalendarClick = () => {
    setShowDatePicker(true);
  };
  
  const nextPage = () => {
    setPage(page + 1);
  };

  const previousPage = () => {
    setPage(page - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission
  };
  
  const renderPage1 = () => (
    <form onSubmit={nextPage}>
      <div style={{ marginBottom: '40px' }}>
      <TextField
        label="First Name/ሙሉ ስም"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required
        fullWidth
        margin="dense"
        InputProps={{
          style: { height: '40px',border: '1px solid #ccc',borderColor: 'black' }, 
        }}
        style={{ width: '200px', height: '5px', fontSize: '14px', padding: '8px',marginLeft:"300px" }}
      />
     
      <TextField
        label="Middle Name/የአባት ስም"
        name="middleName"
        value={formData.middleName}
        onChange={handleChange}
        fullWidth
        margin="dense"
        InputProps={{
          style: { height: '40px',border: '1px solid #ccc',borderColor: 'black' }, 
        }}
        style={{ width: '200px', height: '30px', fontSize: '16px', padding: '8px',marginLeft:'20px' }}
      />
    
      <TextField
        label="Last Name/የአያት ስም"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
        fullWidth
        margin="dense"
        InputProps={{
          style: { height: '40px',border: '1px solid #ccc',  borderColor: 'black'}, 
        }}
        style={{ width: '200px', height: '30px', fontSize: '16px', padding: '8px',marginLeft:'20px' }}
      />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <TextField
        label="Gender/ጾታ"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        InputProps={{
          style: { height: '40px',border: '1px solid #ccc',borderColor: 'black' }, 
        }}
        style={{ width: '200px', height: '30px', fontSize: '16px', padding: '8px',marginLeft:'80px',marginRight:'20px' ,marginTop:'5px'}}
        select
      >
        <MenuItem value="" disabled>
          Select Gender
        </MenuItem>
        <MenuItem value="F">F</MenuItem>
        <MenuItem value="M">M</MenuItem>
       
      </TextField>
      <TextField
        label="Date of Birth/የልደት ቀን "
        value={selectedDate ? selectedDate.toDateString() : ''}
        onClick={handleCalendarClick}
        InputProps={{
          style: { height: '35px',border: '1px solid #ccc' },
          readOnly: true,
          endAdornment: (
            <IconButton onClick={handleCalendarClick}>
              <CalendarTodayIcon />
            </IconButton>
          ),
        }}
       style={{ width: '220px', height: '30px', fontSize: '16px', padding: '8px',marginLeft:'20px' }}
      />
      {showDataPicker && (
        <div style={{ position: 'absolute', zIndex: 1 }}>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          className="data-picker"
          dateFormat="yyyy/MM/dd"
              showYearDropdown
              scrollableYearDropdown 
        />
        </div>
      )}
      <TextField
      label="Marital Status"
      name="maritalStatus"
      value={formData.maritalStatus}
      onChange={handleChange}
      required
      fullWidth
      margin="normal"
      InputProps={{
        style: { height: '40px',border: '1px solid #ccc',borderColor: 'black' }, 
      }}
      style={{ width: '200px', height: '30px', fontSize: '16px', padding: '8px',marginLeft:'40px',marginRight:'20px',marginTop:'5px' }}
     
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
      
  <div style={{ display: 'flex', justifyContent: 'flex-start' ,marginRight:'550px',padding: '20px',marginLeft:'85%' }}>
  <Button variant="contained" color="primary" type="submit" >
    Next
  </Button>
  </div>
    </form>
  );

  const renderPage2 = () => (
    <form onSubmit={nextPage}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <TextField
        label="Email/ኢሜል"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        InputProps={{
          style: { height: '40px',border: '1px solid #ccc',borderColor: 'black' }, 
        }}
        style={{ width: '300px', height: '40px', fontSize: '16px', padding: '8px',  }}
      />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <TextField
        label="Phone Number/የስልክ ቁጥር"
        name="phonenumber"
        type="formData.phonenumber"
        value={formData.password}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        InputProps={{
          style: { height: '40px',border: '1px solid #ccc',borderColor: 'black' }, 
        }}
        style={{ width: '300px', height: '40px', fontSize: '16px', padding: '8px', }}
      />
      </div>
      
  <div style={{ display: 'flex', justifyContent:'flex-end',marginRight:'850px',marginTop: '20px'}}>
        <Button variant="contained" color="primary"onClick={previousPage}>
    Previous
  </Button>
  </div>
<div style={{display: 'flex', justifyContent: 'flex-end',marginTop: '-40px'}}>
    <Button variant="contained" color="primary" type="submit" style={{ marginRight:'400px'}}>
         Next
      </Button>
</div>

    </form>
  );

  const renderPage3 = () => (
    <form onSubmit={handleSubmit}>
          
     <div style={{ display: 'flex', justifyContent: 'center' }}>
      <TextField
        label="Region/ክልል"
        name="region"
        value={formData.region}
        onChange={handleChange}
        required
        margin="normal"
        InputProps={{
          style: { height: '40px',border: '1px solid #ccc',borderColor: 'black' }, 
        }}
        style={{ width: '200px', height: '40px', fontSize: '16px', padding: '8px', }}
      />
      
      <TextField
        label="Woreda/ወረዳ"
        name="woreda"
        value={formData.woreda}
        onChange={handleChange}
        required
        margin="normal"
        InputProps={{
          style: { height: '40px',border: '1px solid #ccc',borderColor: 'black' }, 
        }}
        style={{ width: '200px', height: '40px', fontSize: '16px', padding: '8px', }}
      />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <TextField
        label="Zone/ዞን"
        name="zone"
        value={formData.zone}
        onChange={handleChange}
        required
        margin="normal"
        InputProps={{
          style: { height: '40px',border: '1px solid #ccc',borderColor: 'black' }, 
        }}
        style={{ width: '200px', height: '40px', fontSize: '16px', padding: '8px', }}
         />
     
      <TextField
        label="Kebele/ቀበሌ"
        name="kebele"
        value={formData.kebele}
        onChange={handleChange}
        required
        margin="normal"
        InputProps={{
          style: { height: '40px',border: '1px solid #ccc',borderColor: 'black' }, 
        }}
        style={{ width: '200px', height: '40px', fontSize: '16px', padding: '8px', }}
      />
      </div>
      <div style={{ position: 'relative' }}>
      <Button
        style={{
          position: 'absolute',
          top: '90%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'DodgerBlue',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '4px',
          border: '1px solid black',
          borderColor: 'black',
          fontSize: '16px',
          cursor: 'pointer',
          marginTop: '30px'
        }}
      >
            Upload File
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
        </Button>
          </div>
    
      <div style={{ display: 'flex', justifyContent: 'flex-end',marginRight:'900px',marginTop: '100px' }}>
      <Button variant="contained" color="primary" onClick={previousPage}className="previousButton">
        Previous
      </Button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end',marginRight:'350px',marginTop: '-30px' }}>
      <Button variant="contained" color="primary" type="submit"   className="previousButton"  >
        Register
      </Button>
      </div>
    
    </form>
    
  );
  return (
    
    <>
      {page === 1 && renderPage1()}
      {page === 2 && renderPage2()}
      {page === 3 && renderPage3()}
    </>
    
  );
};

export default RegistrationForm;  
