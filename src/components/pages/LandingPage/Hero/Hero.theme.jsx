import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import EmailSignup from "./EmailSignup";

export const HeroContainer = styled(Box)(() => ({
  position: "relative",
  height: "100vh",
  minHeight: "600px",
  backgroundImage:
    'url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  // Dark overlay for better text readability
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: 1,
  },
}));

// Content wrapper for hero text and signup
export const ContentWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 2,
  textAlign: "center",
  color: "white",
  maxWidth: "500px",
  padding: theme.spacing(3),

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
    maxWidth: "90%",
  },
}));

// Hero-specific styled EmailSignup component
export const HeroEmailSignup = styled(EmailSignup)(({ theme }) => ({
  marginTop: theme.spacing(3),

  "& .MuiPaper-root": {
    backgroundColor: "rgba(255, 255, 255, 0.98)",
    backdropFilter: "blur(12px)",
  },
}));
