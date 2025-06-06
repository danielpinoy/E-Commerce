// src/components/auth/profile/DeleteAccountModal.jsx
import React, { useState } from "react";
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
  Box,
} from "@mui/material";
import { Close, Warning } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth } from "../../../redux/slices/authSlice";
import { deleteUser } from "../../../redux/slices/userSlice";

const DeleteAccountModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.users);

  const [password, setPassword] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleClose = () => {
    setPassword("");
    setConfirmText("");
    setError("");
    setSuccess("");
    setIsDeleting(false);
    onClose();
  };

  const handleDelete = async () => {
    setError("");
    setSuccess("");

    // Simple validation
    if (!password) {
      setError("Password is required");
      return;
    }

    if (confirmText !== "DELETE") {
      setError('Please type "DELETE" to confirm');
      return;
    }

    try {
      setIsDeleting(true);

      // Delete user account via API
      await dispatch(deleteUser(user.id)).unwrap();

      // Show success message
      setSuccess("Account deleted successfully! Logging you out...");

      // Wait 2 seconds to show success message
      setTimeout(() => {
        // Clear auth state (logout)
        dispatch(clearAuth());

        // Close modal
        handleClose();

        // Optional: Redirect to home or show message
        console.log("User logged out after account deletion");
      }, 2000);
    } catch (error) {
      setError(error || "Failed to delete account. Please try again.");
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      {/* Close Button */}
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

      <DialogTitle sx={{ pt: 4, textAlign: "center" }}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Warning sx={{ fontSize: 48, color: "error.main" }} />
        </Box>
        <Typography variant="h4" fontWeight="bold" color="error">
          Delete Account
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          This action cannot be undone
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ px: 4 }}>
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {success}
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="subtitle2" fontWeight="bold">
            Warning: This will permanently delete your account and all data
          </Typography>
        </Alert>

        <Typography variant="body1" sx={{ mb: 3 }}>
          Deleting account for: <strong>{user?.email}</strong>
        </Typography>

        <TextField
          fullWidth
          label="Enter your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 3 }}
          required
        />

        <Typography variant="body2" sx={{ mb: 1 }}>
          Type <strong>DELETE</strong> to confirm:
        </Typography>

        <TextField
          fullWidth
          label="Type DELETE here"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          sx={{ mb: 3 }}
          required
          error={confirmText && confirmText !== "DELETE"}
          helperText={
            confirmText && confirmText !== "DELETE"
              ? 'Must type "DELETE" exactly'
              : ""
          }
        />
      </DialogContent>

      <DialogActions sx={{ px: 4, pb: 4, gap: 2 }}>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          variant="contained"
          color="error"
          disabled={isDeleting || !password || confirmText !== "DELETE"}
        >
          {isDeleting ? "Deleting Account..." : "Delete My Account"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAccountModal;
