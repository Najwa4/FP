import React from "react";
import { Avatar, Card, CardContent, Typography } from "@mui/material";
import "./HRStaffProfileCard.css";
import avatarImage from "../assets/user.png";

const HRStafProfile = () => {
  return (
    <>
    <Card className="card personal-info">
      <CardContent>
        <div className="top">
          <div className="left">
            <Avatar
              src={avatarImage}
              sx={{ mb: 0.5, mt: 0.2, width: 100, height: 100 }}
            />
            <div className="details">
              <Typography variant="h4" className="title">
                Personal Information
              </Typography>
              <div className="detailItem">
                <span className="itemKey">First Name:</span>
                <span className="itemValue">Rahel</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Middle Name:</span>
                <span className="itemValue">sebsibe</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Last Name:</span>
                <span className="itemValue">Alemu</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Role:</span>
                <span className="itemValue">HR Staff</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    
    <div className="basic-info-table">
    <Typography variant="h5" className="title">
          Basic Information
        </Typography>
        <table>
          <tbody>
            <tr>
              <td>Department:</td>
              <td>HR Staff</td>
            </tr>
            <tr>
              <td>Birth Date:</td>
              <td>January 1, 1990</td>
            </tr>
            <tr>
              <td>Hire Date:</td>
              <td>February 1, 2020</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>Female</td>
            </tr>
            <tr>
              <td>Marital Status </td>
              <td>Single</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="contact-table">
  <table>
    <tbody>
      <tr>
        <td colSpan="2" className="table-heading">
          <Typography variant="h5" className="title">
            Contact Information
          </Typography>
        </td>
      </tr>
      <tr>
        <td>Home Phone:</td>
        <td>+1234567890</td>
      </tr>
      <tr>
        <td>Mobile Phone:</td>
        <td>+251965432104</td>
      </tr>
      <tr>
        <td>Email:</td>
        <td>rahelsebsibe9@gmail.com</td>
      </tr>
      <tr>
        <td>Address</td>
        <td>wolkite</td>
      </tr>
      
    </tbody>
  </table>
</div>

    </>
  );
};

export default HRStafProfile;