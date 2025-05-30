import { styled } from "@mui/material/styles";
import { Box, Card, CardMedia, CardContent } from "@mui/material";

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

// Individual category card
export const CategoryCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
  transition: "all 0.3s ease-in-out",
  boxShadow: "none",
  border: "1px solid transparent",

  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[8],
    border: "1px solid rgba(0,0,0,0.1)",
  },

  [theme.breakpoints.down("sm")]: {
    "&:hover": {
      transform: "none",
      boxShadow: "none",
    },
  },
}));

// Category image styling
export const CategoryImage = styled(CardMedia)(({ theme }) => ({
  height: 280,
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "relative",

  [theme.breakpoints.down("md")]: {
    height: 240,
  },

  [theme.breakpoints.down("sm")]: {
    height: 200,
  },
}));

// Category content area
export const CategoryContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));
