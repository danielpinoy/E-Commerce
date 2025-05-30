import { styled } from "@mui/material/styles";
import { Box, Card, CardMedia } from "@mui/material";

// Styled Components for HolidayGiftPicks

// Main section container
export const SectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: "#ffffff",

  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(8, 0),
  },

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(6, 0),
  },
}));

// Two-column content grid
export const ContentGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: theme.spacing(4),

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: theme.spacing(6),
  },

  [theme.breakpoints.down("sm")]: {
    gap: theme.spacing(4),
  },
}));

// Individual content card
export const ContentCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "theme",
})(({ theme: muiTheme, theme }) => ({
  position: "relative",
  height: "500px",
  cursor: "pointer",
  overflow: "hidden",
  borderRadius: muiTheme.spacing(2),
  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
  transition: "all 0.4s ease-in-out",

  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: "0 16px 48px rgba(0,0,0,0.2)",

    "& .card-image": {
      transform: "scale(1.05)",
    },

    "& .card-overlay": {
      background:
        theme === "warm"
          ? "linear-gradient(135deg, rgba(210,105,30,0.85) 0%, rgba(184,134,11,0.9) 100%)"
          : "linear-gradient(135deg, rgba(34,139,34,0.85) 0%, rgba(46,125,50,0.9) 100%)",
    },
  },

  [theme.breakpoints.down("lg")]: {
    height: "450px",
  },

  [theme.breakpoints.down("md")]: {
    height: "400px",

    "&:hover": {
      transform: "none", // Disable hover effects on smaller screens

      "& .card-image": {
        transform: "none",
      },
    },
  },

  [theme.breakpoints.down("sm")]: {
    height: "350px",
  },
}));

// Card background image
export const CardImage = styled(CardMedia)(() => ({
  height: "100%",
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  transition: "transform 0.4s ease-in-out",
  className: "card-image",
}));

// Overlay for content
export const CardOverlay = styled(Box, {
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
    colorTheme === "warm"
      ? "linear-gradient(135deg, rgba(210,105,30,0.7) 0%, rgba(184,134,11,0.8) 100%)"
      : "linear-gradient(135deg, rgba(34,139,34,0.7) 0%, rgba(46,125,50,0.8) 100%)",
  transition: "all 0.4s ease-in-out",
  className: "card-overlay",

  [theme.breakpoints.down("md")]: {
    background:
      colorTheme === "warm" ? "rgba(210,105,30,0.8)" : "rgba(34,139,34,0.8)",
  },
}));

// Content wrapper inside overlay
export const CardContent = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(4),
  maxWidth: "400px",

  [theme.breakpoints.down("lg")]: {
    padding: theme.spacing(3),
    maxWidth: "350px",
  },

  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(3),
    maxWidth: "300px",
  },

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
    maxWidth: "280px",
  },
}));
