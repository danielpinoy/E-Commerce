// src/components/auth/SignupModal.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { register, clearError } from "../../redux";

const SignupModal = ({ open, onClose, onSwitchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleClose = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setValidationError("");
    dispatch(clearError());
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError("");
    dispatch(clearError());

    // Client-side validation
    if (!name || !email || !password || !confirmPassword) {
      setValidationError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setValidationError("Password must be at least 6 characters");
      return;
    }

    try {
      // Split name into firstName and lastName for backend
      const nameParts = name.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ") || "";

      // DEBUG: Check the splitting
      console.log("Original name:", name);
      console.log("Name parts:", nameParts);
      console.log("firstName:", firstName);
      console.log("lastName:", lastName);
      const userData = {
        email,
        password,
        firstName,
        lastName,
      };

      // DEBUG: Log what you're sending
      console.log("Sending to backend:", userData);
      // Dispatch register action and wait for result
      await dispatch(
        register({
          email,
          password,
          firstName,
          lastName,
        })
      ).unwrap();

      handleClose(); // Close modal on success
    } catch (error) {
      // Error is automatically stored in Redux state
      console.error("Signup failed:", error);
    }
  };

  // Show validation error or Redux error
  const displayError = validationError || error;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          zIndex: 1,
        }}
      >
        <Close />
      </IconButton>

      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 4 }}>
          <Typography
            variant="h4"
            sx={{ mb: 1, textAlign: "center", fontWeight: "bold" }}
          >
            Sign Up
          </Typography>

          <Typography
            variant="body2"
            sx={{ mb: 3, textAlign: "center", color: "text.secondary" }}
          >
            Create your account to get started.
          </Typography>

          {displayError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {displayError}
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

          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }}
            required
            helperText="Must be at least 6 characters"
          />

          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ mb: 3 }}
            required
            error={confirmPassword && password !== confirmPassword}
            helperText={
              confirmPassword && password !== confirmPassword
                ? "Passwords do not match"
                : ""
            }
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              mb: 3,
              py: 1.5,
              backgroundColor: "black",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
            }}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{" "}
              <Button
                variant="text"
                onClick={() => {
                  handleClose();
                  onSwitchToLogin();
                }}
                sx={{ textTransform: "none" }}
              >
                Sign in here
              </Button>
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SignupModal;
