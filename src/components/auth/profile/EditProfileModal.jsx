import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Avatar,
  Divider,
} from "@mui/material";
import {
  Person,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  PhotoCamera,
  Close,
} from "@mui/icons-material";
import { useAuth } from "../../../hooks/useAuth";

const EditProfileModal = ({ open, onClose }) => {
  const { user, updateProfile, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Initialize form with user data when modal opens
  useEffect(() => {
    if (open && user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setError("");
      setSuccess("");
      setIsChangingPassword(false);
    }
  }, [open, user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveProfile = async () => {
    setError("");
    setSuccess("");

    // Basic validation
    if (!formData.name.trim()) {
      setError("Name is required");
      return;
    }

    if (!formData.email.trim()) {
      setError("Email is required");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    // Password change validation
    if (isChangingPassword) {
      if (!formData.currentPassword) {
        setError("Current password is required to change password");
        return;
      }

      if (!formData.newPassword) {
        setError("New password is required");
        return;
      }

      if (formData.newPassword.length < 6) {
        setError("New password must be at least 6 characters");
        return;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        setError("New passwords do not match");
        return;
      }
    }

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful update
      const updatedUserData = {
        ...user,
        name: formData.name,
        email: formData.email,
      };

      // Update user in auth context (you'll need to add this method to useAuth)
      // updateProfile(updatedUserData);

      setSuccess("Profile updated successfully!");

      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      setError("Failed to update profile. Please try again.");
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle avatar upload
      console.log("Avatar file:", file);
      // In real app, upload to server and update user avatar
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          position: "relative",
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 16,
          top: 16,
          zIndex: 1,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 1)",
          },
        }}
      >
        <Close />
      </IconButton>

      <DialogTitle sx={{ pt: 4, pb: 2, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold">
          Edit Profile
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Update your personal information
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ px: 4 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {success}
          </Alert>
        )}

        {/* Avatar Section */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <Box sx={{ position: "relative" }}>
            <Avatar
              src={user?.avatar}
              alt={user?.name}
              sx={{ width: 100, height: 100 }}
            >
              {user?.name?.charAt(0)}
            </Avatar>
            <IconButton
              component="label"
              sx={{
                position: "absolute",
                bottom: -5,
                right: -5,
                backgroundColor: "primary.main",
                color: "white",
                width: 35,
                height: 35,
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              }}
            >
              <PhotoCamera fontSize="small" />
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </IconButton>
          </Box>
        </Box>

        {/* Basic Information */}
        <TextField
          fullWidth
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          sx={{ mb: 3 }}
          required
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Person color="action" />
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          fullWidth
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          sx={{ mb: 3 }}
          required
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="action" />
                </InputAdornment>
              ),
            },
          }}
        />

        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Password (Optional)
          </Typography>
        </Divider>

        {/* Password Change Toggle */}
        <Box sx={{ mb: 3, textAlign: "center" }}>
          <Button
            variant={isChangingPassword ? "contained" : "outlined"}
            onClick={() => setIsChangingPassword(!isChangingPassword)}
            sx={{ textTransform: "none" }}
          >
            {isChangingPassword ? "Cancel Password Change" : "Change Password"}
          </Button>
        </Box>

        {/* Password Change Fields */}
        {isChangingPassword && (
          <Box>
            <TextField
              fullWidth
              label="Current Password"
              name="currentPassword"
              type={showCurrentPassword ? "text" : "password"}
              value={formData.currentPassword}
              onChange={handleChange}
              sx={{ mb: 3 }}
              required
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                        edge="end"
                      >
                        {showCurrentPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              fullWidth
              label="New Password"
              name="newPassword"
              type={showNewPassword ? "text" : "password"}
              value={formData.newPassword}
              onChange={handleChange}
              sx={{ mb: 3 }}
              required
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        edge="end"
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              fullWidth
              label="Confirm New Password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              sx={{ mb: 3 }}
              required
              error={
                formData.confirmPassword &&
                formData.newPassword !== formData.confirmPassword
              }
              helperText={
                formData.confirmPassword &&
                formData.newPassword !== formData.confirmPassword
                  ? "Passwords do not match"
                  : ""
              }
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 4, pb: 4, gap: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ textTransform: "none", px: 3 }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSaveProfile}
          variant="contained"
          disabled={isLoading}
          sx={{
            textTransform: "none",
            px: 3,
            backgroundColor: "black",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.8)",
            },
          }}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileModal;
