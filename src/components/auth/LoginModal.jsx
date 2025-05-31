// src/components/auth/LoginModal.jsx
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
import { useAuth } from "../../hooks/useAuth";

const LoginModal = ({ open, onClose, onSwitchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, isLoading } = useAuth();

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setError("");
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const result = await login(email, password);

    if (result.success) {
      handleClose();
    } else {
      setError(result.error);
    }
  };

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
            Sign In
          </Typography>

          <Typography
            variant="body2"
            sx={{ mb: 3, textAlign: "center", color: "text.secondary" }}
          >
            Welcome back! Please sign in to continue.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

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
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{
              mb: 3,
              py: 1.5,
              backgroundColor: "black",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
            }}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?
              <Button
                variant="text"
                onClick={() => {
                  handleClose();
                  onSwitchToSignup();
                }}
                sx={{ textTransform: "none" }}
              >
                Sign up here
              </Button>
            </Typography>
          </Box>

          {/* Demo hint */}
          <Box
            sx={{
              mt: 3,
              p: 2,
              backgroundColor: "#f5f5f5",
              borderRadius: 1,
              textAlign: "center",
            }}
          >
            <Typography variant="caption">
              Demo: test@example.com / password
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
