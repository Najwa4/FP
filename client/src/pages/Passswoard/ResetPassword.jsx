import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AutContext";
import "react-toastify/dist/ReactToastify.css";
import Joi from "joi";

const ResetPasswordScreen = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { resetPassword, error, dispatch } = useAuth();
  const navigate = useNavigate();

  const schema = Joi.object({
    password: Joi.string().min(8).required().label("New Password"),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .label("Confirm Password"),
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleResetPassword = () => {
    const data = { password, confirmPassword };
    const { error: validationError } = schema.validate(data);
    if (validationError) {
      // Handle validation error
      console.error("Validation Error:", validationError.details[0].message);
      return;
    }

    resetPassword(password)
      .then(() => {
        // Reset password successful
        navigate("/login");
      })
      .catch((resetError) => {
        console.error("Reset Password Error:", resetError);
      });
  };

  useEffect(() => {
    if (error) {
      // Handle general error
      console.error("Reset Password Error:", error);
      dispatch({ type: "CLEAR_ERROR" });
    }
  }, [error, dispatch]);

  useEffect(() => {
    // Clear errors on component mount
    dispatch({ type: "CLEAR_ERROR" });
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: "CLEAR_ERROR" });
  }, [dispatch]);

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
        <h2 style={{ textAlign: "center" }}>Reset Password</h2>
      </>
      <TextField
        fullWidth
        variant="outlined"
        margin="normal"
        label="Enter New Password"
        type={showPassword ? "password" : "text"}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        fullWidth
        variant="outlined"
        margin="normal"
        label="Confirm New Password"
        type={showPassword ? "password" : "text"}
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value.trim())}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        color="primary"
        sx={{
          width: "100%",
          padding: "10px 0",
          textTransform: "none",
          fontSize: "16px",
          fontWeight: "bold",
          mt: 2,
        }}
        onClick={handleResetPassword}
      >
        Reset
      </Button>
    </Container>
  );
};

export default ResetPasswordScreen;
