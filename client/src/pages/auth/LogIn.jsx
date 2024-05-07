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
import { getRequest } from "../../services/api";

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

      // Fetch user role from backend using the token
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      // Extract role from token
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.userId;
      console.log("Token:", token);
      console.log("Decoded Token:", decodedToken);
      console.log("User ID:", userId);

      const fetchUserRole = async (userId) => {
        try {
          if (!userId.trim()) {
            return null;
          } else {
            let encodedID = encodeURIComponent(userId);
            const response = await getRequest(`/users/forlogin/${encodedID}`);
            console.log("User:", response);
            if (response && response.data && response.data.role) {
              return response.data.role;
            } else {
              console.error("No data found");
              return null;
            }
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          throw error;
        }
      };

      fetchUserRole(userId)
        .then((role) => {
          console.log("User Role:", role);
          switch (role) {
            case "hr_manager":
              navigate("/manager-announce");
              break;
            case "hr_staff":
              navigate("/ManagerRest");
              break;
            case "dean":
              navigate("/DeanRest");
              break;
            case "employee":
              navigate("/EmpQuit");
              break;
            case "head":
              navigate("/HQuit");
              break;
            default:
              // Navigate to a default route if user role is not recognized
              navigate("/login");
              break;
          }
        })
        .catch((error) => {
          console.error("Error fetching user role:", error);
          navigate("/login"); // Navigate to login in case of error
        });
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Container
        sx={{
          margin: "10% auto 0",
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
            <Typography
              sx={{
                textAlign: "right",
                mb: 2,
                mt: 0.5,
                marginLeft: "auto",
                cursor: "pointer",
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
