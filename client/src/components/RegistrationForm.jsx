import React, { useState } from 'react';
import { TextField, Button, 
  // Select, 
  MenuItem } from '@mui/material';

const RegistrationForm = () => {
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    region: '',
    woreda: '',
    zone: '',
    kebele: '',
    gender: '',
    Dateofbirth: '',
    birthMonth: '',
    birthYear: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        style={{ width: '300px', height: '40px', fontSize: '16px', padding: '8px' }}
        
      />
     
      
      <TextField
        label="Middle Name"
        name="middleName"
        value={formData.middleName}
        onChange={handleChange}
        fullWidth
        margin="normal"
        style={{ width: '300px', height: '40px', fontSize: '16px', padding: '8px', }}
      />
    
      
      <TextField
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        style={{ width: '300px', height: '40px', fontSize: '16px', padding: '8px', }}
      />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <TextField
        label="Gender"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        style={{ width: '300px', height: '40px', fontSize: '16px', padding: '8px', }}
        select
      >
        <MenuItem value="" disabled>
          Select Gender
        </MenuItem>
        <MenuItem value="F">F</MenuItem>
        <MenuItem value="M">M</MenuItem>
       
      </TextField>
      </div>
      {/* Buttons */}
      
      <div style={{ display: 'flex', justifyContent: 'center' }}>
  <TextField
   label=" Dateofbirth"
   name="dateofbirth"
   value={formData.dateofbirth}
   onChange={handleChange}
   required
   fullWidth
   margin="normal"
   style={{ width: '300px', height: '40px', fontSize: '16px', padding: '8px', }} 
  >
  </TextField>
  </div>
  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        style={{ width: '300px', height: '40px', fontSize: '16px', padding: '8px',  }}
      />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        style={{ width: '300px', height: '40px', fontSize: '16px', padding: '8px', }}
      />
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <Button variant="contained" color="primary" onClick={previousPage}>
    Previous
  </Button>
  <Button variant="contained" color="primary" type="submit">
    Next
  </Button>
</div>
    </form>
  );

  const renderPage3 = () => (
    <form onSubmit={handleSubmit}>
     <div style={{ display: 'flex', justifyContent: 'center' }}>
      <TextField
        label="Region"
        name="region"
        value={formData.region}
        onChange={handleChange}
        required
        margin="normal"
        style={{ width: '300px', height: '40px', fontSize: '16px', padding: '8px', }}
      />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <TextField
        label="Woreda"
        name="woreda"
        value={formData.woreda}
        onChange={handleChange}
        required
        margin="normal"
        style={{ width: '300px', height: '40px', fontSize: '16px', padding: '8px', }}
      />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <TextField
        label="Zone"
        name="zone"
        value={formData.zone}
        onChange={handleChange}
        required
        margin="normal"
        style={{ width: '300px', height: '40px', fontSize: '16px', padding: '8px', }}
       
      />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <TextField
        label="Kebele"
        name="kebele"
        value={formData.kebele}
        onChange={handleChange}
        required
        margin="normal"
        style={{ width: '300px', height: '40px', fontSize: '16px', padding: '8px', }}
      />
      </div>
      <Button variant="contained" color="primary" onClick={previousPage}>
        Previous
      </Button>
      <Button variant="contained" color="primary" type="submit">
        Register
      </Button>
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