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
    phoneNumber: '',
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
        margin="dense"
        InputProps={{
          style: { height: '40px' }, 
        }}
        style={{ width: '200px', height: '5px', fontSize: '14px', padding: '8px',marginLeft:"300px" }}
        
      />
     
      <TextField
        label="Middle Name"
        name="middleName"
        value={formData.middleName}
        onChange={handleChange}
        fullWidth
        margin="dense"
        InputProps={{
          style: { height: '40px' }, 
        }}
        style={{ width: '200px', height: '30px', fontSize: '16px', padding: '8px',marginLeft:'20px' }}
      />
    
      <TextField
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
        fullWidth
        margin="dense"
        InputProps={{
          style: { height: '40px' }, 
        }}
        style={{ width: '200px', height: '30px', fontSize: '16px', padding: '8px',marginLeft:'20px' }}
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
        InputProps={{
          style: { height: '40px' }, 
        }}
        style={{ width: '200px', height: '30px', fontSize: '16px', padding: '8px',marginLeft:'80px',marginRight:'20px' }}
        select
      >
        <MenuItem value="" disabled>
          Select Gender
        </MenuItem>
        <MenuItem value="F">F</MenuItem>
        <MenuItem value="M">M</MenuItem>
       
      </TextField>
     
      {/* Buttons */}
      
  
  <TextField
   label=" Dateofbirth"
   name="dateofbirth"
   value={formData.dateofbirth}
   onChange={handleChange}
   required
   fullWidth
   margin="normal"
   InputProps={{
    style: { height: '40px' }, 
  }}
   style={{ width: '300px', height: '40px', fontSize: '16px', padding: '8px', }} 
  >
  </TextField>
  </div>
  <div style={{ display: 'flex', justifyContent: 'flex-start' ,marginRight:'550px',padding: '20px',marginLeft:'900px' }}>
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
        InputProps={{
          style: { height: '40px' }, 
        }}
        style={{ width: '300px', height: '40px', fontSize: '16px', padding: '8px',  }}
      />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <TextField
        label="Phone Number"
        name="phonenumber"
        type="formData.phonenumber"
        value={formData.password}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        InputProps={{
          style: { height: '40px' }, 
        }}
        style={{ width: '300px', height: '40px', fontSize: '16px', padding: '8px', }}
      />
      </div>
      
  <div style={{ display: 'flex', justifyContent:'flex-end',marginRight:'850px'}}>
        <Button variant="contained" color="primary" onClick={previousPage}>
    Previous
  </Button>
  </div>
<div style={{display: 'flex', justifyContent: 'flex-end',marginRight:'500px'}}>
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
        InputProps={{
          style: { height: '40px' }, 
        }}
        style={{ width: '200px', height: '40px', fontSize: '16px', padding: '8px', }}
      />
      
      
      <TextField
        label="Woreda"
        name="woreda"
        value={formData.woreda}
        onChange={handleChange}
        required
        margin="normal"
        InputProps={{
          style: { height: '40px' }, 
        }}
        style={{ width: '200px', height: '40px', fontSize: '16px', padding: '8px', }}
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
        InputProps={{
          style: { height: '40px' }, 
        }}
        style={{ width: '200px', height: '40px', fontSize: '16px', padding: '8px', }}
       
      />
     
      
      <TextField
        label="Kebele"
        name="kebele"
        value={formData.kebele}
        onChange={handleChange}
        required
        margin="normal"
        InputProps={{
          style: { height: '40px' }, 
        }}
        style={{ width: '200px', height: '40px', fontSize: '16px', padding: '8px', }}
      />
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'flex-end',marginRight:'900px' }}>
      <Button variant="contained" color="primary" onClick={previousPage}className="previousButton">
        Previous
      </Button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end',marginRight:'500px' }}>
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