import { styled } from "@mui/material/styles";
import { Box, Card, CardMedia } from "@mui/material";

// Styled Components for FeaturedSections

// Main section container
export const SectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: "#ffffff",

  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(6, 0),
  },

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(4, 0),
  },
}));

// Grid container for the three featured sections
export const FeaturedGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: theme.spacing(3),

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: theme.spacing(4),
  },

  [theme.breakpoints.down("sm")]: {
    gap: theme.spacing(3),
  },
}));

// Individual feature card
export const FeatureCard = styled(Card)(({ theme }) => ({
  position: "relative",
  height: "500px",
  cursor: "pointer",
  overflow: "hidden",
  borderRadius: theme.spacing(1),
  boxShadow: "none",
  transition: "all 0.3s ease-in-out",

  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: theme.shadows[12],

    "& .feature-overlay": {
      backgroundColor: "rgba(0,0,0,0.6)",
    },
  },

  [theme.breakpoints.down("md")]: {
    height: "400px",

    "&:hover": {
      transform: "none",
      boxShadow: "none",
    },
  },

  [theme.breakpoints.down("sm")]: {
    height: "350px",
  },
}));

// Feature image background
export const FeatureImage = styled(CardMedia)(() => ({
  height: "100%",
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
}));

// Overlay for text content
export const FeatureOverlay = styled(Box, {
  shouldForwardProp: (prop) => prop !== "colorTheme",
})(({ theme, colorTheme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background:
    colorTheme === "dark"
      ? "linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%)"
      : "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.95) 100%)",
  transition: "all 0.3s ease-in-out",
  className: "feature-overlay",

  [theme.breakpoints.down("md")]: {
    background:
      colorTheme === "dark" ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.9)",
  },
}));

// Content wrapper inside overlay
export const FeatureContent = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(4),
  maxWidth: "300px",

  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(3),
    maxWidth: "250px",
  },

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
    maxWidth: "200px",
  },
}));
