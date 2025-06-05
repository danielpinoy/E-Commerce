// redux/slices/apiUtils.js

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://51.21.169.211:3000/api";

/**
 * API call with authentication
 */
export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Network error" }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

/**
 * API call without authentication
 */
export const publicApiCall = async (endpoint, options = {}) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Network error" }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};
