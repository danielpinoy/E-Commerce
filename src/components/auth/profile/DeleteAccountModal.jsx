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
import { useAuth } from "../../../hooks/useAuth";

const DeleteAccountModal = ({ open, onClose }) => {
  const { user, deleteAccount, isLoading } = useAuth();

  const [password, setPassword] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [error, setError] = useState("");

  const handleClose = () => {
    setPassword("");
    setConfirmText("");
    setError("");
    onClose();
  };

  const handleDelete = async () => {
    setError("");

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
      await deleteAccount(password);
      handleClose(); // This will also log out the user
    } catch (error) {
      setError("Failed to delete account. Please try again.");
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
          disabled={isLoading || !password || confirmText !== "DELETE"}
        >
          {isLoading ? "Deleting..." : "Delete My Account"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAccountModal;
