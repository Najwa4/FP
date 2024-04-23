import React from 'react';
import RegistrationForm from '../components/RegistrationForm'; // Adjust the import path as necessary

const PersonalInformationpage = () => {
  return (
    <div className='personal-info'>
      <h1 style={{ fontSize: '28px',textAlign:"center" }}>Personal Information Page</h1>
      <RegistrationForm />
    </div>
  );
};

export default PersonalInformationpage;
