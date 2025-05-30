import { styled } from "@mui/material/styles";
import { Box, Card, CardMedia, Chip } from "@mui/material";

// Styled Components for SocialFeed

// Main section container
export const SectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 0),
  backgroundColor: "#fafafa",

  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(10, 0),
  },

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(8, 0),
  },
}));

// Section header container
export const SectionHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(8),

  [theme.breakpoints.down("md")]: {
    marginBottom: theme.spacing(6),
  },

  [theme.breakpoints.down("sm")]: {
    marginBottom: theme.spacing(4),
  },
}));

// Social posts grid
export const SocialGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gap: theme.spacing(2),

  [theme.breakpoints.down("xl")]: {
    gridTemplateColumns: "repeat(4, 1fr)",
  },

  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: theme.spacing(1.5),
  },

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },

  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
    gap: theme.spacing(2),
  },
}));

// Individual social media card
export const SocialCard = styled(Card)(({ theme }) => ({
  position: "relative",
  aspectRatio: "1 / 1", // Square aspect ratio
  cursor: "pointer",
  overflow: "hidden",
  borderRadius: theme.spacing(2),
  boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
  transition: "all 0.3s ease-in-out",

  "&:hover": {
    transform: "scale(1.03)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",

    "& .social-overlay": {
      opacity: 1,
      backgroundColor: "rgba(0,0,0,0.7)",
    },
  },

  [theme.breakpoints.down("sm")]: {
    "&:hover": {
      transform: "none", // Disable hover effects on mobile
    },
  },
}));

// Social post image
export const SocialImage = styled(CardMedia)(() => ({
  width: "100%",
  height: "100%",
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "absolute",
  top: 0,
  left: 0,
}));

// Overlay with social information
export const SocialOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.4)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  opacity: 0,
  transition: "all 0.3s ease-in-out",

  [theme.breakpoints.down("sm")]: {
    opacity: 1, // Always visible on mobile
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: theme.spacing(1.5),
  },
}));

// User information section
export const UserInfo = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",

  "& .MuiAvatar-root": {
    border: "2px solid white",
  },
}));

// Social actions (like, share, shop)
export const SocialActions = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.5),

  "& .MuiIconButton-root": {
    padding: theme.spacing(0.5),

    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.1)",
      transform: "scale(1.1)",
    },
  },
}));

// Product tag/chip
export const ProductTag = styled(Chip)(({ theme }) => ({
  backgroundColor: "rgba(255,255,255,0.2)",
  backdropFilter: "blur(10px)",
  color: "white",
  border: "1px solid rgba(255,255,255,0.3)",
  cursor: "pointer",
  alignSelf: "flex-start",

  "& .MuiChip-label": {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: theme.spacing(1),
    lineHeight: 1.2,
  },

  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.3)",
    transform: "scale(1.05)",
  },

  transition: "all 0.3s ease",

  [theme.breakpoints.down("sm")]: {
    "&:hover": {
      transform: "none",
    },
  },
}));
