import React, { useState } from "react";
import { Dialog, DialogContent, IconButton, Box, Slide } from "@mui/material";
import { Close } from "@mui/icons-material";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AuthModal = ({ open, onClose, initialMode = "login" }) => {
  const [mode, setMode] = useState(initialMode); // 'login' or 'signup'

  const switchToSignup = () => setMode("signup");
  const switchToLogin = () => setMode("login");

  // Reset mode when modal opens
  React.useEffect(() => {
    if (open) {
      setMode(initialMode);
    }
  }, [open, initialMode]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          borderRadius: 3,
          position: "relative",
          maxHeight: "90vh",
          overflow: "hidden",
        },
      }}
      sx={{
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(4px)",
        },
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 16,
          top: 16,
          zIndex: 1,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 1)",
            transform: "scale(1.1)",
          },
          transition: "all 0.2s ease",
        }}
      >
        <Close />
      </IconButton>

      <DialogContent sx={{ p: 0, overflow: "hidden" }}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            overflow: "hidden",
          }}
        >
          {/* Login/Signup Forms Container */}
          <Box
            sx={{
              display: "flex",
              width: "200%",
              transform:
                mode === "login" ? "translateX(0%)" : "translateX(-50%)",
              transition: "transform 0.3s ease-in-out",
            }}
          >
            {/* Login Form */}
            <Box sx={{ width: "50%", flexShrink: 0 }}>
              <LoginForm onSwitchToSignup={switchToSignup} onClose={onClose} />
            </Box>

            {/* Signup Form */}
            <Box sx={{ width: "50%", flexShrink: 0 }}>
              <SignupForm onSwitchToLogin={switchToLogin} onClose={onClose} />
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
