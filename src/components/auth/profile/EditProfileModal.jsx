// src/components/auth/profile/EditProfileModal.jsx
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Alert,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, clearError } from "../../../redux";

const EditProfileModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [localError, setLocalError] = useState("");
  const [success, setSuccess] = useState("");

  // Load user data when modal opens
  useEffect(() => {
    if (open && user) {
      const fullName =
        user.firstName && user.lastName
          ? `${user.firstName} ${user.lastName}`
          : user.name || "";
      setName(fullName);
      setEmail(user.email || "");
      setLocalError("");
      setSuccess("");
      dispatch(clearError());
    }
  }, [open, user, dispatch]);

  // Debug: Log user data
  useEffect(() => {
    console.log("User from Redux:", user);
  }, [user]);

  const handleSave = async () => {
    setLocalError("");
    setSuccess("");
    dispatch(clearError());

    // Simple validation
    if (!name || !email) {
      setLocalError("Please fill in all fields");
      return;
    }

    try {
      // Split name into firstName and lastName
      const nameParts = name.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ") || "";

      // Dispatch updateProfile action
      await dispatch(
        updateProfile({
          firstName,
          lastName,
          email,
        })
      ).unwrap();

      setSuccess("Profile updated successfully!");

      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      setLocalError("Failed to update profile. Please try again.");
      console.error("Update profile error:", error);
    }
  };

  // Show local error or Redux error
  const displayError = localError || error;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      {/* Close Button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          zIndex: 1,
        }}
      >
        <Close />
      </IconButton>

      <DialogTitle sx={{ pt: 4, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold">
          Edit Profile
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ px: 4 }}>
        {displayError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {displayError}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {success}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 3 }}
          required
          placeholder="Enter your full name"
        />

        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 3 }}
          required
          placeholder="Enter your email address"
        />
      </DialogContent>

      <DialogActions sx={{ px: 4, pb: 4, gap: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={loading}
          sx={{
            backgroundColor: "black",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
          }}
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileModal;
