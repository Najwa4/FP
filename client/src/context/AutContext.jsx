import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    case "VERIFY_OTP_SUCCESS":
      return {
        ...state,
        isVerified: true,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (username, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username,
          password,
        }
      );
      dispatch({ type: "LOGIN", payload: response.data.data });
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      if (error.response) {
        const serverErrorMessage = error.response.data.message;
        dispatch({ type: "ERROR", payload: serverErrorMessage });
      } else {
        console.error("Login error:", error);
        dispatch({
          type: "ERROR",
          payload: "An error occurred while logging.",
        });
      }
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem("token");
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.error("Logout error:", error);
      dispatch({ type: "ERROR", payload: error.message });
    }
  };

  const forgotPassword = async (email) => {
    try {
      // const response = await axios.post(
      await axios.post("http://localhost:5000/api/auth/forgot-password", {
        email,
      });
    } catch (error) {
      if (error.response) {
        const serverErrorMessage = error.response.data.message;
        dispatch({ type: "ERROR", payload: serverErrorMessage });
      } else {
        console.error("Forgot password error:", error);
        dispatch({
          type: "ERROR",
          payload:
            "An error occurred while initiating forgot password request.",
        });
      }
    }
  };

  const verifyOTP = async (otp) => {
    try {
      // const response = await axios.post(
      await axios.post("http://localhost:5000/api/auth/verify-otp", {
        otp,
      });
      dispatch({ type: "VERIFY_OTP_SUCCESS" });
      // console.log(response.otp);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const serverErrorMessage = error.response.data.message;
        dispatch({ type: "ERROR", payload: serverErrorMessage });
      } else if (error.response && error.response.status === 400) {
        dispatch({
          type: "ERROR",
          payload: "OTP expired. Please request a new one.",
        });
      } else {
        // Handle other errors
        console.error("OTP verification error:", error);
        dispatch({
          type: "ERROR",
          payload: "An error occurred while verifying OTP.",
        });
      }
    }
  };

  const resetPassword = async (password) => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);

      // Check if the token exists
      if (!token) {
        // If the token is missing, dispatch an error
        dispatch({
          type: "ERROR",
          payload: "No token found. Please login again.",
        });
        return; // Exit the function
      }

      // Configure the request headers with the token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Make the reset password request with the token included in the headers
      const response = await axios.put(
        "http://localhost:5000/api/auth/reset-password",
        { password },
        config
      );

      // Log the success message
      console.log(response.data.message);
    } catch (error) {
      if (error.response) {
        const serverErrorMessage = error.response.data.message;
        dispatch({ type: "ERROR", payload: serverErrorMessage });
      } else {
        console.error("Reset password error:", error);
        dispatch({
          type: "ERROR",
          payload: "An error occurred while resetting password.",
        });
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        isVerified: state.isVerified,
        login,
        logout,
        forgotPassword,
        verifyOTP,
        resetPassword,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
