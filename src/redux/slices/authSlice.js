import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiCall } from "./apiUtils";

//  thunks

// POST /api/auth/register
export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      // Your backend expects: email, password, firstName, lastName
      const result = await apiCall("/auth/register", {
        method: "POST",
        body: JSON.stringify(userData),
      });

      if (result.token) {
        localStorage.setItem("token", result.token);
      }

      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// POST /api/auth/login
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const result = await apiCall("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });

      if (result.token) {
        localStorage.setItem("token", result.token);
      }

      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// GET /api/auth/profile
export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const result = await apiCall("/auth/profile");
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// PUT /api/auth/profile
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const result = await apiCall("/auth/profile", {
        method: "PUT",
        body: JSON.stringify(profileData),
      });
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// PUT /api/auth/change-password
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      // Your backend expects: { oldPassword, newPassword }
      const result = await apiCall("/auth/change-password", {
        method: "PUT",
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// POST /api/auth/logout
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const result = await apiCall("/auth/logout", {
        method: "POST",
      });
      localStorage.removeItem("token");
      return result;
    } catch (error) {
      // Still remove token even if API call fails
      localStorage.removeItem("token");
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
};

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    // Register
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });

    // Login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        // console.log(state.user);
        state.token = action.payload.token;
        // console.log(state.token);
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });

    // Get Profile
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.token = null;
        localStorage.removeItem("token");
      });

    // Update Profile
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload.user) {
          state.user = action.payload.user;
        } else {
          state.user = action.payload;
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Change Password
    builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Logout
    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError, clearAuth } = authSlice.actions;
export default authSlice.reducer;
