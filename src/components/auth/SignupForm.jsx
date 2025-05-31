import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  LinearProgress,
} from "@mui/material";
import {
  Person,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useAuth } from "../../hooks/useAuth";
import { useSelector, useDispatch } from "react-redux";
import { register, clearError } from "../../redux/slices/authSlice";
const SignupForm = ({ onSwitchToLogin, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const { signup, isLoading } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    return Math.min(strength, 100);
  };

  const getPasswordStrengthColor = (strength) => {
    if (strength < 50) return "error";
    if (strength < 75) return "warning";
    return "success";
  };

  const getPasswordStrengthText = (strength) => {
    if (strength < 50) return "Weak";
    if (strength < 75) return "Medium";
    return "Strong";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    if (formData.name.length < 2) {
      setError("Name must be at least 2 characters");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const result = await signup(
      formData.email,
      formData.password,
      formData.name
    );

    if (result.success) {
      onClose(); // Close modal on success
    } else {
      setError(result.error);
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);

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
        Create Account
      </Typography>

      <Typography
        variant="body2"
        sx={{
          mb: 4,
          textAlign: "center",
          color: "text.secondary",
        }}
      >
        Join us and start your sustainable fashion journey
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

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
        placeholder="Enter your full name"
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
        placeholder="Enter your email"
      />

      <TextField
        fullWidth
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        value={formData.password}
        onChange={handleChange}
        sx={{ mb: 2 }}
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
        placeholder="Create a password"
      />

      {/* Password Strength Indicator */}
      {formData.password && (
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Password Strength
            </Typography>
            <Typography
              variant="caption"
              color={`${getPasswordStrengthColor(passwordStrength)}.main`}
              sx={{ fontWeight: 600 }}
            >
              {getPasswordStrengthText(passwordStrength)}
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={passwordStrength}
            color={getPasswordStrengthColor(passwordStrength)}
            sx={{ height: 6, borderRadius: 3 }}
          />
        </Box>
      )}

      <TextField
        fullWidth
        label="Confirm Password"
        name="confirmPassword"
        type={showConfirmPassword ? "text" : "password"}
        value={formData.confirmPassword}
        onChange={handleChange}
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
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        placeholder="Confirm your password"
        error={
          formData.confirmPassword &&
          formData.password !== formData.confirmPassword
        }
        helperText={
          formData.confirmPassword &&
          formData.password !== formData.confirmPassword
            ? "Passwords do not match"
            : ""
        }
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
        {isLoading ? "Creating Account..." : "Create Account"}
      </Button>

      <Box sx={{ textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Already have an account?{" "}
          <Button
            variant="text"
            onClick={onSwitchToLogin}
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
            Sign in here
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignupForm;
