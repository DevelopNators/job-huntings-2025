import {
  CLEAR_TOKEN,
  SET_TOKEN,
  SET_DECODED_TOKEN,
  SET_AUTHENTICATED,
  GET_TOKEN,
} from "../reducers/TokenReducer";
import { decodeJwt, isTokenExpired } from "../../utils/SecurityUtility";

// Store token and decoded data in Redux and localStorage
export const storeToken = (response) => {
  return (dispatch) => {
    try {
      localStorage.setItem("token", response); // Save token to localStorage
      const decoded = decodeJwt(response);
      dispatch(setToken(response));
      dispatch(setDecodedToken(decoded));
      dispatch(setAuthenticated(true)); // Set user as authenticated
    } catch (error) {
      console.error("Error decoding token:", error);
      dispatch(setAuthenticated(false)); // If error occurs, set authenticated to false
    }
  };
};

// Check the token on app load, and handle expiration
export const setDecodedData = () => {
  return (dispatch) => {
    try {
      let token = localStorage.getItem("token");
      if (token) {
        // Check if token is expired
        if (isTokenExpired(token)) {
          console.log("Token expired");
          dispatch(logout()); // Logout if token expired
        } else {
          const decoded = decodeJwt(token);
          dispatch(setToken(token));
          dispatch(setDecodedToken(decoded));
          dispatch(setAuthenticated(true)); // Set user as authenticated
        }
      } else {
        dispatch(setAuthenticated(false)); // No token found, set to false
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      dispatch(setAuthenticated(false)); // Set to false if decoding fails
    }
  };
};

// Logout logic: Remove token and reset state
export const logout = () => {
  return (dispatch) => {
    dispatch(setAuthenticated(false)); // Reset authentication state
    dispatch(setDecodedToken(null)); // Reset decoded token
    dispatch(clearToken());
    localStorage.removeItem("token"); // Remove token from localStoage
  };
};

// Helper actions
export const setToken = (newToken) => {
  return {
    type: SET_TOKEN,
    payload: newToken,
  };
};

export const clearToken = () => {
  return {
    type: CLEAR_TOKEN,
  };
};

export const setDecodedToken = (token) => {
  return {
    type: SET_DECODED_TOKEN,
    payload: token,
  };
};

export const setAuthenticated = (isAuthenticated) => {
  return {
    type: SET_AUTHENTICATED,
    payload: isAuthenticated,
  };
};

export const getTokenAction = (token) => {
  return {
    type: GET_TOKEN,
    payload: token,
  };
};
