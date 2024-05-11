import React, { useState } from "react";
import "../../styles/TableComponent.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Card, CardContent, Typography, Button } from "@mui/material";

const AppTable = ({ data, onAccept, onReject }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const handleOpenModal = (applicant) => {
    setSelectedApplicant(applicant);
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
            <th>Announcement ID</th>
            <th>Gender</th>
            <th>BD</th>
            <th>Phone Number</th>
            <th>Email Address</th>
            <th>Applicant Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((applicant, index) => (
            <tr key={index}>
              <td>{applicant._id}</td>
              <td>{applicant.fullName}</td>
              <td>{applicant.announcementId}</td>
              <td>{applicant.gender}</td>
              <td>{applicant.dateOfBirth}</td>
              <td>{applicant.phoneNumber}</td>
              <td>{applicant.emailAddress}</td>
              <td>{applicant.Applicant_status}</td>
              <td>
                <button onClick={() => handleOpenModal(applicant)}>
                  More Info
                </button>
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
              {selectedApplicant && (
                <div>
                  <Typography variant="body1">
                    ID: {selectedApplicant._id}
                  </Typography>
                  <Typography variant="body1">
                    Name: {selectedApplicant.fullName}
                  </Typography>
                  <Typography variant="body1">
                    Username: {selectedApplicant.username}
                  </Typography>
                  <Typography variant="body1">
                    Gender: {selectedApplicant.gender}
                  </Typography>
                  <Typography variant="body1">
                    Date of Birth: {selectedApplicant.dateOfBirth}
                  </Typography>
                  <Typography variant="body1">
                    Location: {selectedApplicant.location}
                  </Typography>
                  <Typography variant="body1">
                    Phone Number: {selectedApplicant.phoneNumber}
                  </Typography>
                  <Typography variant="body1">
                    Email Address: {selectedApplicant.emailAddress}
                  </Typography>
                  <Typography variant="body1">
                    Contact Person Name: {selectedApplicant.contactPersonname}
                  </Typography>
                  <Typography variant="body1">
                    Contact Person Phone Number:{" "}
                    {selectedApplicant.contactPersonphoneNumber}
                  </Typography>
                  <Typography variant="body1">
                    Field of Study: {selectedApplicant.fieldOfStudy}
                  </Typography>
                  <Typography variant="body1">
                    University: {selectedApplicant.university}
                  </Typography>
                  <Typography variant="body1">
                    Graduation Date: {selectedApplicant.graduationDate}
                  </Typography>
                  <Typography variant="body1">
                    Previous Organization:{" "}
                    {selectedApplicant.previousOrganization}
                  </Typography>
                  <Typography variant="body1">
                    Reference: {selectedApplicant.referencesPhone}
                  </Typography>
                  <Typography variant="body1">
                    Skills: {selectedApplicant.skills}
                  </Typography>
                  <Typography variant="body1">
                    Applicant Status: {selectedApplicant.Applicant_status}
                  </Typography>
                  <Typography variant="body1">
                    Timestamps: {selectedApplicant.timestamps}
                  </Typography>
                  <div>
                    <Button
                      variant="contained"
                      onClick={() => {
                        onAccept(
                          selectedApplicant.announcementId,
                          selectedApplicant._id
                        );
                        handleCloseModal();
                      }}
                      style={{
                        backgroundColor: "#FFD700",
                        borderRadius: "10px",
                        marginRight: "1.5%",
                        marginBottom: "1.5%",
                        width: "calc(16% - 1.5%)",
                      }}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        onReject(
                          selectedApplicant.announcementId,
                          selectedApplicant._id
                        );
                        handleCloseModal();
                      }}
                      style={{
                        backgroundColor: "#FF6347",
                        borderRadius: "10px",
                        marginBottom: "1.5%",
                        marginRight: "1.5%",
                        width: "calc(16% - 1.5%)",
                      }}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </div>
  );
};

export default AppTable;
