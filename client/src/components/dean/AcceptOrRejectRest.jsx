import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

const RestCard = ({ RestRequests, onAccept, onReject }) => {
  return (
    <>
      {RestRequests.length === 0 ? (
        <Typography
          variant="h6"
          style={{ fontWeight: "bold", marginBottom: "1rem" }}
        >
          No rest request available.
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
              {RestRequests.reason}
            </div>
            <Typography variant="body1" sx={{ marginBottom: "1.8%" }}>
              {" "}
              <strong style={{ fontSize: "1.2rem" }}>Employee ID:</strong>
              <br /> {RestRequests.employeeId}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: "1.8%" }}>
              {" "}
              <strong style={{ fontSize: "1.2rem" }}>Full Name:</strong>
              <br /> {RestRequests.fullName}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: "1.8%" }}>
              {" "}
              <strong style={{ fontSize: "1.2rem" }}>College:</strong>{" "}
              {RestRequests.college}
              {
                "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"
              }
              <strong style={{ fontSize: "1.2rem" }}>Department:</strong>{" "}
              {RestRequests.department}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: "1.8%" }}>
              {" "}
              <strong style={{ fontSize: "1.2rem" }}>Start Date:</strong>
              {RestRequests.startDate}
              {"\u00A0\u00A0\u00A0\u00A0"}
              <strong style={{ fontSize: "1.2rem" }}>End Date:</strong>
              {RestRequests.endDate}
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: "0%" }}>
              {" "}
              <strong style={{ fontSize: "1.2rem" }}>Created At:</strong>
              <br /> {RestRequests.createdAt}
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

export default RestCard;
