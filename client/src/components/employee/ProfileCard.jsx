import React from "react";
import { Avatar, Typography, Button } from "@mui/material";
import "../../styles/HRStaffProfileCard.css";
import avatarImage from "../../assets/user.png";

const Profile = ({ users, onReport, onChange }) => {
  return (
    <>
      <div className="top">
        <Avatar
          src={avatarImage}
          sx={{ mb: 0.5, mt: 0.2, width: 100, height: 100 }}
        />
      </div>

      <div className="info-table">
        <Typography variant="h5" className="title">
          Personal Information
        </Typography>
        <table>
          <tbody>
            <tr>
              <td>ID:</td>
              <td>{users._id}</td>
            </tr>
            <tr>
              <td>Full Name:</td>
              <td>{users.fullName}</td>
            </tr>
            <tr>
              <td>Username:</td>
              <td>{users.username}</td>
            </tr>
            <tr>
              <td>Birth Date:</td>
              <td>{users.birthDate}</td>
            </tr>
            <tr>
              <td>Gender:</td>
              <td>{users.gender}</td>
            </tr>
            <tr>
              <td>Marital Status:</td>
              <td>{users.maritalStatus}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="info-table">
        <Typography variant="h5" className="title">
          Educational Information
        </Typography>
        <table>
          <tbody>
            <tr>
              <td>Education Level:</td>
              <td>{users.highestLevel}</td>
            </tr>
            <tr>
              <td>University:</td>
              <td>{users.university}</td>
            </tr>
            <tr>
              <td>Graduation Date:</td>
              <td>{users.graduationDate}</td>
            </tr>
            <tr>
              <td>Field Of Study</td>
              <td>{users.fieldOfStudy}</td>
            </tr>
            <tr>
              <td>Skills</td>
              <td>{users.skills}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="info-table">
        <Typography variant="h5" className="title">
          Work History
        </Typography>
        <table>
          <tbody>
            <tr>
              <td>Previous Organization:</td>
              <td>{users.previousOrganization}</td>
            </tr>
            <tr>
              <td>Previous Organization started work Date:</td>
              <td>{users.prevStartDate}</td>
            </tr>
            <tr>
              <td>Previous Organization ended work Date:</td>
              <td>{users.prevEndDate}</td>
            </tr>
            <tr>
              <td>References Name:</td>
              <td>{users.referencesName}</td>
            </tr>
            <tr>
              <td>References Position:</td>
              <td>{users.referencesPosition}</td>
            </tr>
            <tr>
              <td>References Email:</td>
              <td>{users.referencesEmail}</td>
            </tr>
            <tr>
              <td>References Phone:</td>
              <td>{users.referencesPhone}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="info-table">
        <Typography variant="h5" className="title">
          Job Information
        </Typography>
        <table>
          <tbody>
            <tr>
              <td>College:</td>
              <td>{users.college}</td>
            </tr>
            <tr>
              <td>Department:</td>
              <td>{users.department}</td>
            </tr>
            <tr>
              <td>Hire Date:</td>
              <td>{users.hireDate}</td>
            </tr>
            <tr>
              <td>Salary:</td>
              <td>{users.salary}</td>
            </tr>
            <tr>
              <td>Days Of Absence This Month:</td>
              <td>{users.daysOfAbsence}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="info-table">
        <Typography variant="h5" className="title">
          Contact Information
        </Typography>
        <table>
          <tbody>
            <tr>
              <td>Phone:</td>
              <td>{users.phoneNumber}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{users.emailAddress}</td>
            </tr>
            <tr>
              <td>Address:</td>
              <td>{users.address}</td>
            </tr>
            <tr>
              <td>Emergency Contact Name:</td>
              <td>{users.contactPersonname}</td>
            </tr>
            <tr>
              <td>Emergency Contact Number:</td>
              <td>{users.contactPersonphoneNumber}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Button
        variant="contained"
        onClick={onReport}
        style={{
          backgroundColor: "#196F3D",
          borderRadius: "10px",
          marginLeft: "10%",
          marginBottom: "1.5%",
          display: "block",
        }}
      >
        Report
      </Button>

      <Button
        variant="contained"
        onClick={onChange}
        style={{
          backgroundColor: "#196F3D",
          borderRadius: "10px",
          marginLeft: "10%",
          marginBottom: "1.5%",
          display: "block",
        }}
      >
        Change Password
      </Button>
    </>
  );
};

export default Profile;
