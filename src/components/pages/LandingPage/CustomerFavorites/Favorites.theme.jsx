import { styled } from "@mui/material/styles";
import { Box, Card, CardMedia, IconButton } from "@mui/material";

// Styled Components for CustomerFavorites

// Main section container
export const SectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: "#fafafa",

  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(8, 0),
  },

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(6, 0),
  },
}));

// Carousel container with navigation
export const CarouselContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),

  [theme.breakpoints.down("md")]: {
    gap: theme.spacing(1),
  },
}));

// Product carousel with sliding animation
export const ProductCarousel = styled(Box, {
  shouldForwardProp: (prop) => prop !== "currentIndex",
})(({ theme, currentIndex }) => ({
  display: "flex",
  gap: theme.spacing(3),
  transition: "transform 0.5s ease-in-out",
  transform: `translateX(-${currentIndex * (100 / 4)}%)`,
  width: "100%",
  overflow: "hidden",

  [theme.breakpoints.down("lg")]: {
    gap: theme.spacing(2),
    transform: `translateX(-${currentIndex * (100 / 3)}%)`, // Show 3 items
  },

  [theme.breakpoints.down("md")]: {
    transform: `translateX(-${currentIndex * (100 / 2)}%)`, // Show 2 items
  },

  [theme.breakpoints.down("sm")]: {
    transform: `translateX(-${currentIndex * 100}%)`, // Show 1 item
    gap: theme.spacing(1),
  },
}));

// Individual product card
export const ProductCard = styled(Card)(({ theme }) => ({
  minWidth: "calc(25% - 18px)", // 4 items per row with gap
  maxWidth: "calc(25% - 18px)",
  cursor: "pointer",
  borderRadius: theme.spacing(1.5),
  overflow: "hidden",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  transition: "all 0.3s ease-in-out",
  position: "relative",

  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 12px 24px rgba(0,0,0,0.15)",

    "& .product-actions": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },

  [theme.breakpoints.down("lg")]: {
    minWidth: "calc(33.333% - 16px)", // 3 items per row
    maxWidth: "calc(33.333% - 16px)",
  },

  [theme.breakpoints.down("md")]: {
    minWidth: "calc(50% - 12px)", // 2 items per row
    maxWidth: "calc(50% - 12px)",
  },

  [theme.breakpoints.down("sm")]: {
    minWidth: "calc(100% - 8px)", // 1 item per row
    maxWidth: "calc(100% - 8px)",

    "&:hover": {
      transform: "none", // Disable hover effects on mobile
    },
  },
}));

// Product image
export const ProductImage = styled(CardMedia)(({ theme }) => ({
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

// Product action buttons (wishlist, cart)
export const ProductActions = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  right: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  opacity: 0,
  transform: "translateY(-10px)",
  transition: "all 0.3s ease-in-out",
  className: "product-actions",

  "& .MuiIconButton-root": {
    backgroundColor: "rgba(0,0,0,0.7)",
    backdropFilter: "blur(10px)",
    color: "white",
    width: 40,
    height: 40,

    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.9)",
      transform: "scale(1.1)",
    },
  },

  [theme.breakpoints.down("sm")]: {
    opacity: 1, // Always visible on mobile
    transform: "translateY(0)",
  },
}));

// Product information section
export const ProductInfo = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1.5),
  },
}));

// Navigation buttons
export const NavigationButton = styled(IconButton)(
  ({ theme, position, disabled }) => ({
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 2,
    width: 48,
    height: 48,
    backgroundColor: "white",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    color: disabled ? "rgba(0,0,0,0.3)" : "black",

    ...(position === "left"
      ? {
          left: -24,
        }
      : {
          right: -24,
        }),

    "&:hover": {
      backgroundColor: disabled ? "white" : "rgba(0,0,0,0.04)",
      transform: disabled ? "translateY(-50%)" : "translateY(-50%) scale(1.1)",
    },

    "&:disabled": {
      backgroundColor: "white",
      cursor: "not-allowed",
    },

    transition: "all 0.3s ease",

    [theme.breakpoints.down("md")]: {
      width: 40,
      height: 40,

      ...(position === "left"
        ? {
            left: -20,
          }
        : {
            right: -20,
          }),
    },

    [theme.breakpoints.down("sm")]: {
      display: "none", // Hide navigation on mobile
    },
  })
);
