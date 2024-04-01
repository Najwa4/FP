import React, { useState, useEffect } from "react";
import { Container, TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AutContext";
import { toast } from "react-toastify";

const VerificationPage = () => {
  const [otp, setOtp] = useState("");
  const [resendTime, setResendTime] = useState(120);
  const { verifyOTP, isVerified, error, dispatch } = useAuth();
  const navigate = useNavigate();

  // const handleResend = () => {
  //   setResendTime(120);
  // };

  const handleOTPVerification = () => {
    verifyOTP(otp);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  useEffect(() => {
    if (error) {
      toast.error(error.details[0].message);
      dispatch({ type: "CLEAR_ERROR" });
    }
  }, [error, dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (resendTime > 0) {
        setResendTime((prevTime) => prevTime - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTime]);

  useEffect(() => {
    if (isVerified) {
      console.log("Verification process completed.");
      navigate("/reset");
    }
  }, [isVerified, navigate]);

  return (
    <Container
      sx={{
        margin: "50px auto 0",
        width: "380px",
        padding: "40px",
        borderRadius: "15px",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
        background: "rgba(255, 255, 255, 0.9)",
      }}
    >
      <>
        <h2 style={{ textAlign: "center" }}>Verification</h2>
        <p>You will get a verification OTP code via Email</p>
      </>

      <TextField
        label="Enter Verification Code"
        variant="outlined"
        margin="normal"
        fullWidth
        value={otp}
        onChange={(e) => {
          const numericValue = e.target.value
            .replace(/[^0-9]/g, "")
            .slice(0, 6);
          setOtp(numericValue);
        }}
      />
      <Link to="/reset" style={{ textDecoration: "none", color: "#19524e" }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: "100%",
            padding: "10px 0",
            textTransform: "none",
            fontSize: "16px",
            fontWeight: "bold",
          }}
          onClick={handleOTPVerification}
          disabled={isVerified || otp.length !== 6}
        >
          Verify OTP
        </Button>
      </Link>
      <p style={{ textAlign: "center", marginTop: "10px" }}>
        {resendTime > 0 ? (
          `Time Remaining: ${formatTime(resendTime)}`
        ) : (
          <Button
            variant="text"
            color="primary"
            sx={{
              textTransform: "none",
              fontSize: "16px",
            }}
            // onClick={handleResendOTP}
            disabled={isVerified}
          >
            Resend OTP
          </Button>
        )}
      </p>
    </Container>
  );
};

export default VerificationPage;
