import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { putRequest } from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ChangePasswordForm = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match. Please confirm your password.");
      return;
    }
    try {
      const response = await putRequest("/auth/change-password", {
        currentPassword,
        newPassword,
      });
      if (response && response.message === "Password updated successfully") {
        navigate("/HProfile");
        toast.success("Password updated successfully!");
      } else {
        toast.error("Failed to update password. Please try again.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <div style={{ padding: "10%" }}>
      <Typography variant="h4">Change Password</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          id="currentPassword"
          label="Current Password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
          required
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#196F3D",
              },
            "& .MuiInputLabel-outlined.Mui-focused": {
              color: "#196F3D",
            },
          }}
        />
        <TextField
          id="newPassword"
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
          required
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#196F3D",
              },
            "& .MuiInputLabel-outlined.Mui-focused": {
              color: "#196F3D",
            },
          }}
        />
        <TextField
          id="confirmPassword"
          label="Confirm New Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
          required
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#196F3D",
              },
            "& .MuiInputLabel-outlined.Mui-focused": {
              color: "#196F3D",
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          style={{
            backgroundColor: "#196F3D",
            color: "#FFFFFF",
            marginTop: "1%",
          }}
        >
          Update Password
        </Button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
