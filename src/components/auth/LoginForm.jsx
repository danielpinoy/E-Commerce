import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../../hooks/useAuth";

const LoginForm = ({ onSwitchToSignup, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { login, isLoading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    const result = await login(email, password);

    if (result.success) {
      onClose(); // Close modal on success
    } else {
      setError(result.error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 4 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 1,
          textAlign: "center",
          fontWeight: "bold",
          color: "text.primary",
        }}
      >
        Welcome Back
      </Typography>

      <Typography
        variant="body2"
        sx={{
          mb: 4,
          textAlign: "center",
          color: "text.secondary",
        }}
      >
        Sign in to your account to continue shopping
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Email Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
        placeholder="Enter your email"
      />

      <TextField
        fullWidth
        label="Password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 4 }}
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
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        placeholder="Enter your password"
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
          fontSize: "1rem",
          fontWeight: 600,
          textTransform: "none",
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.8)",
          },
          "&:disabled": {
            backgroundColor: "rgba(0,0,0,0.3)",
          },
        }}
      >
        {isLoading ? "Signing In..." : "Sign In"}
      </Button>

      <Box sx={{ textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Don't have an account?{" "}
          <Button
            variant="text"
            onClick={onSwitchToSignup}
            sx={{
              textTransform: "none",
              p: 0,
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "transparent",
                textDecoration: "underline",
              },
            }}
          >
            Create one here
          </Button>
        </Typography>
      </Box>

      {/* Demo credentials hint */}
      <Box
        sx={{
          mt: 3,
          p: 2,
          backgroundColor: "rgba(0,0,0,0.04)",
          borderRadius: 1,
          textAlign: "center",
        }}
      >
        <Typography variant="caption" color="text.secondary">
          <strong>Demo:</strong> test@example.com / password
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginForm;
