import React, { useState } from "react";
import "../../styles/TableComponent.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const EmpTable = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleOpenModal = (user) => {
    setSelectedEmployee(user);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
              <td>{user.department}</td>
              <td>{user.college}</td>
              <td>
                <button onClick={() => handleOpenModal(user)}>More Info</button>
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
            width: 500,
            height: 700,
            margin: "auto",
            marginTop: "20vh",
            borderRadius: "20px",
            overflow: "auto",
          }}
        >
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                Employee Details
              </Typography>
              {selectedEmployee && (
                <div>
                  <Typography variant="body1">
                    ID: {selectedEmployee._id}
                  </Typography>
                  <Typography variant="body1">
                    Name: {selectedEmployee.fullName}
                  </Typography>
                  <Typography variant="body1">
                    Username: {selectedEmployee.username}
                  </Typography>
                  <Typography variant="body1">
                    Gender: {selectedEmployee.gender}
                  </Typography>
                  <Typography variant="body1">
                    Date of Birth: {selectedEmployee.dateOfBirth}
                  </Typography>
                  <Typography variant="body1">
                    Location: {selectedEmployee.location}
                  </Typography>
                  <Typography variant="body1">
                    Phone Number: {selectedEmployee.phoneNumber}
                  </Typography>
                  <Typography variant="body1">
                    Email Address: {selectedEmployee.emailAddress}
                  </Typography>
                  <Typography variant="body1">
                    Contact Person Name: {selectedEmployee.contactPersonname}
                  </Typography>
                  <Typography variant="body1">
                    Contact Person Phone Number:{" "}
                    {selectedEmployee.contactPersonphoneNumber}
                  </Typography>
                  <Typography variant="body1">
                    Field of Study: {selectedEmployee.fieldOfStudy}
                  </Typography>
                  <Typography variant="body1">
                    University: {selectedEmployee.university}
                  </Typography>
                  <Typography variant="body1">
                    Graduation Date: {selectedEmployee.graduationDate}
                  </Typography>
                  <Typography variant="body1">
                    Hire Date: {selectedEmployee.hireDate}
                  </Typography>
                  <Typography variant="body1">
                    Salary: {selectedEmployee.salary}
                  </Typography>
                  <Typography variant="body1">
                    Days of Absence: {selectedEmployee.daysOfAbsence}
                  </Typography>
                  <Typography variant="body1">
                    Account Status: {selectedEmployee.account_status}
                  </Typography>
                  <Typography variant="body1">
                    Timestamps: {selectedEmployee.timestamps}
                  </Typography>
                  <Typography variant="body1">
                    Role: {selectedEmployee.role}
                  </Typography>
                  <Typography variant="body1">
                    Department: {selectedEmployee.department}
                  </Typography>
                  <Typography variant="body1">
                    College: {selectedEmployee.college}
                  </Typography>
                </div>
              )}
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </div>
  );
};

export default EmpTable;
