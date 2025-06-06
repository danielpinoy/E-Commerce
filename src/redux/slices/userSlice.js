import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiCall } from "./apiUtils";

// Async thunks

// GET /api/user
export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const result = await apiCall("/user");
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// GET /api/user/:id
export const getUserById = createAsyncThunk(
  "users/getUserById",
  async (userId, { rejectWithValue }) => {
    try {
      const result = await apiCall(`/user/${userId}`);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// PUT /api/user/:id
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const result = await apiCall(`/user/${userId}`, {
        method: "PUT",
        body: JSON.stringify(userData),
      });
      return { userId, ...result };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// DELETE /api/user/:id
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const result = await apiCall(`/user/${userId}`, {
        method: "DELETE",
      });
      return { userId, ...result };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
};

// User slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    // Get all users
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get user by ID
    builder
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.currentUser = null;
      });

    // Update user
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const { userId, user } = action.payload;
        const index = state.users.findIndex((u) => u.id === userId);
        if (index !== -1 && user) {
          state.users[index] = user;
        }
        if (state.currentUser && state.currentUser.id === userId && user) {
          state.currentUser = user;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete user
    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        const { userId } = action.payload;
        state.users = state.users.filter((u) => u.id !== userId);
        if (state.currentUser && state.currentUser.id === userId) {
          state.currentUser = null;
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCurrentUser } = userSlice.actions;
export default userSlice.reducer;
