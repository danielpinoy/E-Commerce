import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

// Styled Components for Footer

// Main footer container
export const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#f8f8f8",
  borderTop: "1px solid #e0e0e0",
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(4),
  marginTop: "auto",

  [theme.breakpoints.down("md")]: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(3),
  },

  [theme.breakpoints.down("sm")]: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(2),
  },
}));

// Footer content wrapper
export const FooterContent = styled(Box)(() => ({
  // No additional styling needed, just a wrapper
}));

// Service features section
export const ServiceFeatures = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: theme.spacing(4),
  marginBottom: theme.spacing(4),

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: theme.spacing(3),
    textAlign: "center",
  },
}));

// Individual service feature item
export const FeatureItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",

  [theme.breakpoints.down("md")]: {
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",

    "& > *:first-of-type": {
      marginRight: 0,
      marginBottom: theme.spacing(1),
    },
  },
}));

// Links grid layout
export const LinksGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gap: theme.spacing(6),

  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: theme.spacing(4),
  },

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: theme.spacing(4),
  },

  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
    gap: theme.spacing(4),
  },
}));

// Individual footer section
export const FooterSection = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}));

// Newsletter signup section
export const FooterNewsletter = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),

  [theme.breakpoints.down("sm")]: {
    marginBottom: theme.spacing(3),
  },
}));

// Social media section
export const SocialSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

// Bottom section with copyright
export const BottomSection = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: theme.spacing(4),

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: theme.spacing(3),

    "& > *:last-child": {
      alignSelf: "flex-start",

      "& > *:last-child": {
        justifyContent: "flex-start",
      },
    },
  },
}));
