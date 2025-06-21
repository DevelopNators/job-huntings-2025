import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds

    // Return true if the token is expired
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error("Error decoding token for expiration check", error);
    throw new Error("Invalid token format");
  }
};
export const decodeJwt = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken;
  } catch (error) {
    console.error("Error decoding token for expiration check", error);
    throw new Error("Invalid token format");
  }
};
