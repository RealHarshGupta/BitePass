// src/utils/auth.js
import { jwtDecode } from "jwt-decode";

// ✅ Get token from localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// ✅ Decode token safely
export const decodeToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Token decoding failed:", error);
    return null;
  }
};

// ✅ Save token to localStorage
export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

// ✅ Remove token from localStorage
export const removeToken = () => {
  localStorage.removeItem("token");
};
