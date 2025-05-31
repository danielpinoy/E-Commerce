import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api";

// Helper
const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}/user${endpoint}`, config);

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Network error" }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// User management slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});
export default userSlice.reducer;
