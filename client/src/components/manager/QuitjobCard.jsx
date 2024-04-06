import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

const QuitjobCard = ({ quitJobRequests, onAccept, onReject }) => {
  return (
    <>
      {quitJobRequests.length === 0 ? (
        <Typography
          variant="h6"
          style={{ fontWeight: "bold", marginBottom: "1rem" }}
        >
          No announcements available.
        </Typography>
      ) : (
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
              style={{
                marginBottom: "2%",
                fontWeight: "bold",
                fontSize: "1.8rem",
              }}
            >
                {/* Leve job request with id :
              {quitJobRequests._id} */}
            </div>
            <Typography variant="body1" sx={{ marginBottom: "1.8%" }}>
              {" "}
              <strong style={{ fontSize: "1.2rem" }}>Reason for Quitting:</strong>
              <br /> {quitJobRequests.reason}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: "1.8%" }}>
              {" "}
              <strong style={{ fontSize: "1.2rem" }}>Employee Name:</strong>
              <br /> {quitJobRequests.fullName}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: "1.8%" }}>
              {" "}
              <strong style={{ fontSize: "1.2rem" }}>Department:</strong>
              <br /> {quitJobRequests.department}
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: "0%" }}>
              {" "}
              <strong style={{ fontSize: "1.2rem" }}>Feedback:</strong>
              <br /> {quitJobRequests.feedback}
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: "0%" }}>
              {" "}
              <strong style={{ fontSize: "1.2rem" }}>Status:</strong>
              <br /> {quitJobRequests.status}
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
              onClick={onAccept}
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
              onClick={onReject}
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
        </Card>
      )}
    </>
  );
};

export default QuitjobCard;
