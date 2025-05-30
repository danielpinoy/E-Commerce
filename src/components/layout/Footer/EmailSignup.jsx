import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

const EmailSignup = ({
  title = "Stay Connected",
  subtitle = "Get the latest updates on new arrivals and sales.",
  placeholder = "Enter your email",
  buttonText = "Subscribe",
  onSubmit,
  compactMode = false,
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
    <Box {...props}>
      {title && !compactMode && (
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 500,
            marginBottom: 1,
            color: "text.primary",
          }}
        >
          {title}
        </Typography>
      )}

      {subtitle && (
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            marginBottom: 3,
            fontSize: "0.875rem",
            lineHeight: 1.5,
          }}
        >
          {subtitle}
        </Typography>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexDirection: compactMode ? "column" : { xs: "column", sm: "row" },
          }}
        >
          <TextField
            fullWidth
            type="email"
            placeholder={placeholder}
            value={email}
            onChange={handleEmailChange}
            required
            variant="outlined"
            size={compactMode ? "small" : "medium"}
            sx={{
              backgroundColor: "background.paper",
              "& .MuiOutlinedInput-root": {
                borderRadius: 1,
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            size={compactMode ? "small" : "medium"}
            sx={{
              backgroundColor: "black",
              color: "white",
              px: compactMode ? 2 : 4,
              py: compactMode ? 0.75 : 1.5,
              borderRadius: 1,
              textTransform: "none",
              fontWeight: 500,
              minWidth: compactMode ? "auto" : { xs: "auto", sm: "120px" },
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.8)",
              },
              "&:disabled": {
                backgroundColor: "rgba(0,0,0,0.3)",
              },
            }}
          >
            {isSubmitting ? "Subscribing..." : buttonText}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EmailSignup;
