import { styled } from "@mui/material/styles";
import { Box, CardMedia } from "@mui/material";

// Styled Components for ProductShowcase

// Main showcase container
export const ShowcaseContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 0),
  backgroundColor: "#ffffff",

  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(10, 0),
  },

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(8, 0),
  },
}));

// Two-column content grid
export const ContentGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: theme.spacing(8),
  alignItems: "center",

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: theme.spacing(6),
  },

  [theme.breakpoints.down("sm")]: {
    gap: theme.spacing(4),
  },
}));

// Product image section
export const ProductImageSection = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: theme.spacing(2),
  overflow: "hidden",
  backgroundColor: "#f8f8f8",

  // Add subtle shadow
  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",

  [theme.breakpoints.down("md")]: {
    order: -1, // Move image above content on mobile
  },
}));

// Product image
export const ProductImage = styled(CardMedia)(({ theme }) => ({
  height: 600,
  backgroundSize: "cover",
  backgroundPosition: "center",
  transition: "transform 0.3s ease",

  "&:hover": {
    transform: "scale(1.02)",
  },

  [theme.breakpoints.down("lg")]: {
    height: 500,
  },

  [theme.breakpoints.down("md")]: {
    height: 400,

    "&:hover": {
      transform: "none", // Disable hover on mobile
    },
  },

  [theme.breakpoints.down("sm")]: {
    height: 300,
  },
}));

// Product details section
export const ProductDetailsSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4, 2),

  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(2, 1),
    textAlign: "center",
  },

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1, 0),
  },
}));

// Feature badges container
export const FeatureBadges = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(4),
  padding: theme.spacing(3),
  backgroundColor: "#f9f9f9",
  borderRadius: theme.spacing(1.5),
  border: "1px solid #e0e0e0",

  "& .MuiSvgIcon-root": {
    color: "#2e7d32",
    fontSize: "1.2rem",
  },

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
    gap: theme.spacing(1),
  },
}));

// Action buttons container
export const ActionButtons = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(3),
  alignItems: "center",
  marginBottom: theme.spacing(6),

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: theme.spacing(2),
    alignItems: "stretch",

    "& .MuiButton-root": {
      width: "100%",
      justifyContent: "center",
    },
  },
}));

// Customer quote section
export const CustomerQuote = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: "#fafafa",
  borderRadius: theme.spacing(2),
  borderLeft: `4px solid ${theme.palette.primary.main}`,
  marginTop: theme.spacing(4),

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
}));
