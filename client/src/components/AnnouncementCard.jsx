import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

const AnnouncementCard = ({ announcements, onApply }) => {
  return (
    <Card
      sx={{
        width: "80%",
        marginBottom: "3%",
        height: "40%",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        border: "1px solid #ccc",
        borderRadius: "15px",
      }}
    >
      <CardContent>
        <div
          style={{ marginBottom: "2%", fontWeight: "bold", fontSize: "1.8rem" }}
        >
          {announcements.department}
        </div>
        <Typography variant="body1" sx={{ marginBottom: "1.8%" }}>
          {" "}
          <strong style={{ fontSize: "1.2rem" }}>Job Description:</strong>
          <br /> {announcements.jobDescription}
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: "0%" }}>
          {" "}
          <strong style={{ fontSize: "1.2rem" }}>Job Requirements:</strong>
          <br /> {announcements.jobRequirements}
        </Typography>
      </CardContent>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "1%",
        }}
      >
        <Button
          variant="contained"
          onClick={onApply}
          style={{
            backgroundColor: "#196F3D",
            borderRadius: "10px",
            marginRight: "1.5%",
            marginBottom: "1.5%",
          }}
        >
          Apply
        </Button>
      </div>
    </Card>
  );
};

export default AnnouncementCard;
