import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { GlassCard, SignupForm } from "./EmailSignup.theme";

const EmailSignup = ({
  title = "Stay in the Loop",
  subtitle = "Be the first to know about new arrivals and exclusive offers.",
  placeholder = "Enter your email address",
  buttonText = "Sign Up",
  onSubmit,
  variant = "medium",
  fullWidth = false,
  ...props
}) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit(email);
      } else {
        //  log to console
        console.log("Email submitted:", email);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      setEmail("");
    } catch (error) {
      console.error("Email signup failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <GlassCard elevation={3} className={`glass-${variant}`} {...props}>
      {title && (
        <Typography
          variant="h6"
          component="h3"
          sx={{
            color: variant === "dark" ? "white" : "text.primary",
            fontWeight: 500,
            marginBottom: 1,
          }}
        >
          {title}
        </Typography>
      )}

      {subtitle && (
        <Typography
          variant="body2"
          sx={{
            color:
              variant === "dark" ? "rgba(255,255,255,0.8)" : "text.secondary",
            marginBottom: 2,
          }}
        >
          {subtitle}
        </Typography>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <SignupForm>
          <TextField
            fullWidth={fullWidth}
            type="email"
            placeholder={placeholder}
            value={email}
            onChange={handleEmailChange}
            required
            variant="outlined"
            size="medium"
            sx={{
              backgroundColor: "white",
              "& .MuiOutlinedInput-root": {
                borderRadius: 1,
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            sx={{
              backgroundColor: "black",
              color: "white",
              px: 4,
              py: 1.5,
              borderRadius: 1,
              textTransform: "none",
              fontWeight: 500,
              minWidth: { xs: "auto", sm: "120px" },
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.8)",
              },
              "&:disabled": {
                backgroundColor: "rgba(0,0,0,0.3)",
              },
            }}
          >
            {isSubmitting ? "Signing Up..." : buttonText}
          </Button>
        </SignupForm>
      </Box>
    </GlassCard>
  );
};

export default EmailSignup;
