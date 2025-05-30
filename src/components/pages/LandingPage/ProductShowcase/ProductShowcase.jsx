import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Rating,
  Chip,
} from "@mui/material";
import {
  ArrowForward,
  LocalShipping,
  Park, // Changed from Eco to Park
  WorkspacePremium,
} from "@mui/icons-material";
import {
  ShowcaseContainer,
  ContentGrid,
  ProductImageSection,
  ProductImage,
  ProductDetailsSection,
  CustomerQuote,
  FeatureBadges,
  ActionButtons,
} from "./ProductShowcase.theme";

const ProductShowcase = () => {
  const [selectedColor, setSelectedColor] = useState("Stone");

  // Featured product data
  const featuredProduct = {
    id: "featured-shirt-jacket",
    name: "The Organic Cotton Shirt Jacket",
    tagline: "Effortlessly versatile. Consciously crafted.",
    price: 88,
    originalPrice: 118,
    rating: 4.8,
    reviews: 342,
    colors: [
      {
        name: "Stone",
        hex: "#D4C5B9",
        image:
          "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      },
      {
        name: "Sage",
        hex: "#9CAF88",
        image:
          "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      },
      {
        name: "Navy",
        hex: "#2C3E50",
        image:
          "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      },
    ],
    features: [
      { icon: <Park />, text: "100% Organic Cotton" },
      { icon: <LocalShipping />, text: "Free Shipping & Returns" },
      { icon: <WorkspacePremium />, text: "365-Day Guarantee" },
    ],
    description:
      "The perfect layering piece that transitions seamlessly from work to weekend. Made from certified organic cotton with a relaxed fit that flatters every body type.",
    customerQuote: {
      text: "I can't stop wearing this perfectly soft shirt. The fabric is thick without being stiff.",
      author: "Sarah M.",
      location: "San Francisco, CA",
      verified: true,
    },
  };

  const handleColorSelect = (colorName) => {
    setSelectedColor(colorName);
  };

  const handleAddToCart = () => {
    console.log("Add to cart:", featuredProduct.name, "Color:", selectedColor);
    // Add to cart logic here
  };

  const handleViewProduct = () => {
    console.log("Navigate to product page:", featuredProduct.id);
    // Navigate to full product page
  };

  const selectedColorData = featuredProduct.colors.find(
    (color) => color.name === selectedColor
  );

  return (
    <ShowcaseContainer>
      <Container maxWidth="lg">
        <ContentGrid>
          {/* Product Image Section */}
          <ProductImageSection>
            <ProductImage
              image={selectedColorData?.image}
              title={featuredProduct.name}
            />

            {/* Sale Badge */}
            <Box
              sx={{
                position: "absolute",
                top: 20,
                left: 20,
                zIndex: 2,
              }}
            >
              <Chip
                label="25% OFF"
                sx={{
                  backgroundColor: "#e53e3e",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "0.75rem",
                }}
              />
            </Box>
          </ProductImageSection>

          {/* Product Details Section */}
          <ProductDetailsSection>
            {/* Product Info */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="overline"
                sx={{
                  color: "text.secondary",
                  fontWeight: 500,
                  letterSpacing: 1,
                  fontSize: "0.75rem",
                }}
              >
                FEATURED PRODUCT
              </Typography>

              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.5rem" },
                  fontWeight: "bold",
                  marginBottom: 1,
                  color: "text.primary",
                  lineHeight: 1.2,
                }}
              >
                {featuredProduct.name}
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: "text.secondary",
                  fontWeight: 300,
                  marginBottom: 3,
                  fontSize: { xs: "1rem", sm: "1.1rem" },
                }}
              >
                {featuredProduct.tagline}
              </Typography>

              {/* Rating and Reviews */}
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
              >
                <Rating
                  value={featuredProduct.rating}
                  precision={0.1}
                  readOnly
                  size="small"
                />
                <Typography variant="body2" color="text.secondary">
                  {featuredProduct.rating} ({featuredProduct.reviews} reviews)
                </Typography>
              </Box>

              {/* Price */}
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    color: "text.primary",
                  }}
                >
                  ${featuredProduct.price}
                </Typography>

                <Typography
                  variant="h5"
                  sx={{
                    textDecoration: "line-through",
                    color: "text.secondary",
                    fontWeight: 400,
                  }}
                >
                  ${featuredProduct.originalPrice}
                </Typography>
              </Box>
            </Box>

            {/* Color Selection */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>
                Color: {selectedColor}
              </Typography>

              <Box sx={{ display: "flex", gap: 1 }}>
                {featuredProduct.colors.map((color) => (
                  <Box
                    key={color.name}
                    onClick={() => handleColorSelect(color.name)}
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      backgroundColor: color.hex,
                      cursor: "pointer",
                      border:
                        selectedColor === color.name
                          ? "3px solid black"
                          : "2px solid #e0e0e0",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Product Features */}
            <FeatureBadges>
              {featuredProduct.features.map((feature, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  {feature.icon}
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {feature.text}
                  </Typography>
                </Box>
              ))}
            </FeatureBadges>

            {/* Description */}
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                lineHeight: 1.6,
                mb: 4,
              }}
            >
              {featuredProduct.description}
            </Typography>

            {/* Action Buttons */}
            <ActionButtons>
              <Button
                variant="contained"
                size="large"
                onClick={handleAddToCart}
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  py: 1.5,
                  px: 4,
                  borderRadius: 1,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "1rem",
                  "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.8)",
                  },
                }}
              >
                Add to Cart
              </Button>

              <Button
                variant="text"
                size="large"
                onClick={handleViewProduct}
                endIcon={<ArrowForward />}
                sx={{
                  color: "text.primary",
                  textTransform: "none",
                  fontWeight: 500,
                  "&:hover": {
                    backgroundColor: "transparent",
                    textDecoration: "underline",
                  },
                }}
              >
                View Full Details
              </Button>
            </ActionButtons>

            {/* Customer Quote */}
            <CustomerQuote>
              <Typography
                variant="body1"
                sx={{
                  fontStyle: "italic",
                  fontSize: "1.1rem",
                  lineHeight: 1.5,
                  mb: 2,
                  color: "text.primary",
                }}
              >
                "{featuredProduct.customerQuote.text}"
              </Typography>

              <Typography
                variant="body2"
                component="div"
                sx={{
                  color: "text.secondary",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                — {featuredProduct.customerQuote.author},{" "}
                {featuredProduct.customerQuote.location}
                {featuredProduct.customerQuote.verified && (
                  <Chip
                    label="Verified Buyer"
                    size="small"
                    sx={{
                      ml: 1,
                      backgroundColor: "#e8f5e8",
                      color: "#2e7d32",
                      fontSize: "0.7rem",
                      height: 20,
                    }}
                  />
                )}
              </Typography>
            </CustomerQuote>
          </ProductDetailsSection>
        </ContentGrid>
      </Container>
    </ShowcaseContainer>
  );
};

export default ProductShowcase;
