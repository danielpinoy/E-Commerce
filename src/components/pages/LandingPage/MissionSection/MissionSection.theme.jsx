import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import EmailSignup from "../Hero/EmailSignup";

// Styled Components for MissionSection

// Main mission container with green background
export const MissionContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(12, 0),
  background: "linear-gradient(135deg, #2e7d32 0%, #388e3c 50%, #43a047 100%)",
  color: "white",
  overflow: "hidden",

  // Add subtle pattern overlay
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px),
      radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 1px, transparent 1px)
    `,
    backgroundSize: "50px 50px, 30px 30px",
    opacity: 0.3,
    zIndex: 1,
  },

  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(10, 0),
  },

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(8, 0),
  },
}));

// Content wrapper for mission content
export const ContentWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 2,
  textAlign: "center",
  maxWidth: "800px",
  margin: "0 auto",
  padding: theme.spacing(0, 3),

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0, 2),
  },
}));

// Mission-specific styled EmailSignup component
export const MissionEmailSignup = styled(EmailSignup)(() => ({
  maxWidth: "500px",
  margin: "0 auto",

  // Override EmailSignup glass card for mission theme
  "& .MuiPaper-root": {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",

    "&.glass-dark": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      color: "white",

      "& .MuiTypography-root": {
        color: "white",
      },

      "& .MuiTypography-body2": {
        color: "rgba(255, 255, 255, 0.9)",
      },
    },
  },

  // Style the form elements for dark theme
  "& .MuiTextField-root": {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "rgba(255, 255, 255, 0.95)",

      "& fieldset": {
        borderColor: "rgba(255, 255, 255, 0.3)",
      },

      "&:hover fieldset": {
        borderColor: "rgba(255, 255, 255, 0.5)",
      },

      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },

    "& input::placeholder": {
      color: "rgba(0, 0, 0, 0.6)",
    },
  },

  // Style the submit button
  "& .MuiButton-root": {
    backgroundColor: "white",
    color: "#2e7d32",
    fontWeight: 600,

    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      transform: "translateY(-1px)",
    },

    "&:disabled": {
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      color: "rgba(46, 125, 50, 0.7)",
    },

    transition: "all 0.3s ease",
  },
}));
