import { styled } from "@mui/material/styles";
import { Paper, Box } from "@mui/material";

export const GlassCard = styled(Paper)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),

  "&.glass-light": {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },

  "&.glass-medium": {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
  },

  "&.glass-dark": {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "white",
  },

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

export const SignupForm = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: theme.spacing(2),
  },
}));
