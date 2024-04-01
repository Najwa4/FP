import React, { useState, useEffect } from "react";
import {
  Box,
  Avatar,
  Button,
  Typography,
  Container,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import avatarImage from "../../assets/user.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AutContext";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { login, isAuthenticated, error } = useAuth();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleLogin = () => {
    login(username, password);
  };

  useEffect(() => {
    if (error) {
      toast.error(error || "Something went wrong");
    }
  }, [error]);

  useEffect(() => {
    if (isAuthenticated) {
      console.log("User is authenticated:", isAuthenticated);
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
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
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Avatar
            alt=""
            src={avatarImage}
            sx={{ mb: 2, width: 100, height: 100 }}
          />
        </div>
        <Box
          sx={{ display: "flex", alignItems: "flex-end" }}
          noValidate
          autoComplete="off"
        >
          <EmailIcon sx={{ mr: 1, my: 2 }} />
          <TextField
            label="Enter your Username"
            variant="outlined"
            size="normal"
            margin="normal"
            sx={{ width: "34ch" }}
            value={username}
            onChange={(event) => setUsername(event.target.value.trim())}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <LockIcon sx={{ mr: 0.1, my: 2.5 }} />
          <FormControl sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-password">
              Enter your Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "password" : "text"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Enter your Password"
              size="normal"
              sx={{ width: "33.5ch" }}
              value={password}
              onChange={(event) => setPassword(event.target.value.trim())}
            />
          </FormControl>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Link
            to="/forgot-password"
            style={{ textDecoration: "none", color: "#19524e" }}
          >
            {/* Add an onClick handler to trigger handleForgotPassword */}
            <Typography
              sx={{
                textAlign: "right",
                mb: 2,
                mt: 0.5,
                marginLeft: "auto",
                cursor: "pointer", // Add cursor style to indicate it's clickable
              }}
              variant="body2"
            >
              Forgot password?
            </Typography>
          </Link>
        </Box>
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
          onClick={handleLogin}
        >
          Login
        </Button>
      </Container>
    </>
  );
};

export default LoginScreen;
