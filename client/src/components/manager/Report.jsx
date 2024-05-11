import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { postRequest } from "../../services/api";
import { toast } from "react-toastify";
import "../../styles/Report.css";
import { useNavigate } from "react-router-dom";

const ReportPage = () => {
  const navigate = useNavigate();
  const [mistake, setMistake] = useState("");

  const handleSubmit = async (mistake, event) => {
    event.preventDefault();
    try {
      const response = await postRequest("/users/report", { mistake });
      if (response) {
        navigate("/Prof");
        toast.success("Report sent successfully!");
        console.log(response.data);
      } else {
        toast.error("Failed to sent Report. Please try again.");
        setMistake("");
      }
    } catch (error) {
      console.error("Error creating Report:", error);
    }
  };

  return (
    <div className="container">
      <Typography variant="h4">Report Profile Mistakes</Typography>
      <TextField
        id="description"
        label="Mistake Description"
        multiline
        rows={4}
        value={mistake}
        onChange={(event) => setMistake(event.target.value)}
        fullWidth
        required
        variant="outlined"
        margin="normal"
        className="text-field"
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
        variant="contained"
        onClick={(event) => handleSubmit(mistake, event)}
        className="submit-button"
      >
        Submit Report
      </Button>
    </div>
  );
};

export default ReportPage;
