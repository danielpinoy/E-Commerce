import React, { useState } from "react";
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
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Lock,
  Visibility,
  VisibilityOff,
  Close,
  Warning,
  Check,
} from "@mui/icons-material";
import { useAuth } from "../../../hooks/useAuth";

const DeleteAccountModal = ({ open, onClose }) => {
  const { user, deleteAccount, isLoading } = useAuth();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1); // 1: Warning, 2: Confirmation

  const handleClose = () => {
    setPassword("");
    setConfirmationText("");
    setAgreedToTerms(false);
    setError("");
    setStep(1);
    onClose();
  };

  const handleDeleteAccount = async () => {
    setError("");

    // Validation
    if (!password) {
      setError("Password is required to delete your account");
      return;
    }

    if (confirmationText !== "DELETE") {
      setError('Please type "DELETE" exactly to confirm');
      return;
    }

    if (!agreedToTerms) {
      setError("You must agree to the terms before deleting your account");
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock account deletion
      console.log("Account deleted for user:", user.email);

      // In real app, call deleteAccount from auth context
      // await deleteAccount(password);

      // Close modal and logout user
      handleClose();
    } catch (error) {
      setError("Failed to delete account. Please try again.");
    }
  };

  const dataLoss = [
    "All your order history",
    "Saved addresses and payment methods",
    "Wishlist and favorites",
    "Account preferences and settings",
    "Loyalty points and rewards",
    "Email preferences and subscriptions",
  ];

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
        onClick={handleClose}
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

      {step === 1 && (
        <>
          <DialogTitle sx={{ pt: 4, pb: 2, textAlign: "center" }}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <Warning sx={{ fontSize: 60, color: "error.main" }} />
            </Box>
            <Typography variant="h4" fontWeight="bold" color="error">
              Delete Account
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              This action cannot be undone
            </Typography>
          </DialogTitle>

          <DialogContent sx={{ px: 4 }}>
            <Alert severity="error" sx={{ mb: 3 }}>
              <Typography variant="subtitle2" fontWeight="bold">
                Warning: This will permanently delete your account
              </Typography>
            </Alert>

            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              You will lose access to:
            </Typography>

            <List dense>
              {dataLoss.map((item, index) => (
                <ListItem key={index} sx={{ pl: 0 }}>
                  <ListItemIcon sx={{ minWidth: 35 }}>
                    <Check color="error" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body2" color="text.secondary">
                        {item}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>

            <Box
              sx={{
                mt: 3,
                p: 2,
                backgroundColor: "rgba(255,0,0,0.05)",
                borderRadius: 1,
              }}
            >
              <Typography variant="body2" color="error.main">
                <strong>Alternative:</strong> Instead of deleting your account,
                you can deactivate it temporarily. This allows you to reactivate
                it later with all your data intact.
              </Typography>
            </Box>
          </DialogContent>

          <DialogActions sx={{ px: 4, pb: 4, gap: 2 }}>
            <Button
              onClick={handleClose}
              variant="contained"
              sx={{
                textTransform: "none",
                px: 3,
                backgroundColor: "black",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.8)",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => setStep(2)}
              variant="outlined"
              color="error"
              sx={{ textTransform: "none", px: 3 }}
            >
              Continue to Delete
            </Button>
          </DialogActions>
        </>
      )}

      {step === 2 && (
        <>
          <DialogTitle sx={{ pt: 4, pb: 2, textAlign: "center" }}>
            <Typography variant="h4" fontWeight="bold" color="error">
              Confirm Account Deletion
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Enter your password and confirmation text
            </Typography>
          </DialogTitle>

          <DialogContent sx={{ px: 4 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Typography variant="body1" sx={{ mb: 3 }}>
              Deleting account for: <strong>{user?.email}</strong>
            </Typography>

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Typography variant="body2" sx={{ mb: 1 }}>
              Type <strong>DELETE</strong> to confirm:
            </Typography>

            <TextField
              fullWidth
              label="Confirmation Text"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              sx={{ mb: 3 }}
              required
              placeholder="Type DELETE here"
              error={confirmationText && confirmationText !== "DELETE"}
              helperText={
                confirmationText && confirmationText !== "DELETE"
                  ? 'Must type "DELETE" exactly'
                  : ""
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  color="error"
                />
              }
              label={
                <Typography variant="body2">
                  I understand this action is permanent and cannot be undone
                </Typography>
              }
              sx={{ mb: 2 }}
            />
          </DialogContent>

          <DialogActions sx={{ px: 4, pb: 4, gap: 2 }}>
            <Button
              onClick={() => setStep(1)}
              variant="outlined"
              sx={{ textTransform: "none", px: 3 }}
            >
              Back
            </Button>
            <Button
              onClick={handleDeleteAccount}
              variant="contained"
              color="error"
              disabled={
                isLoading ||
                !password ||
                confirmationText !== "DELETE" ||
                !agreedToTerms
              }
              sx={{
                textTransform: "none",
                px: 3,
              }}
            >
              {isLoading ? "Deleting Account..." : "Delete My Account"}
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default DeleteAccountModal;
