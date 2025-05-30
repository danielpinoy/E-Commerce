import React, { useState } from "react";
import { Container, Typography, IconButton, Box } from "@mui/material";
import {
  ArrowBackIos,
  ArrowForwardIos,
  FavoriteOutlined,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import {
  SectionContainer,
  ProductCarousel,
  ProductCard,
  ProductImage,
  ProductInfo,
  ProductActions,
  NavigationButton,
  CarouselContainer,
} from "./Favorites.theme";

const CustomerFavorites = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // example customer products data
  const favoriteProducts = [
    {
      id: 1,
      name: "The Organic Cotton Crew",
      price: 68,
      originalPrice: null,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      colors: ["White", "Black", "Navy"],
      rating: 4.8,
      reviews: 1247,
    },
    {
      id: 2,
      name: "The Modern Ankle Jean",
      price: 88,
      originalPrice: 118,
      image:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      colors: ["Dark Blue", "Light Blue", "Black"],
      rating: 4.9,
      reviews: 892,
    },
    {
      id: 3,
      name: "The Cashmere Crew",
      price: 128,
      originalPrice: null,
      image:
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      colors: ["Beige", "Gray", "Navy"],
      rating: 4.7,
      reviews: 564,
    },
    {
      id: 4,
      name: "The ReNew Transit Backpack",
      price: 78,
      originalPrice: null,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      colors: ["Black", "Forest", "Tan"],
      rating: 4.6,
      reviews: 723,
    },
    {
      id: 5,
      name: "The Silk Button-Up",
      price: 98,
      originalPrice: 138,
      image:
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      colors: ["White", "Cream", "Light Blue"],
      rating: 4.8,
      reviews: 445,
    },
  ];

  const itemsPerView = 4; // Show 4 items at once on desktop
  const maxIndex = Math.max(0, favoriteProducts.length - itemsPerView);

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const handleAddToWishlist = (product) => {
    console.log("Add to wishlist:", product.name);
    // Add wishlist logic here
  };

  const handleAddToCart = (product) => {
    console.log("Add to cart:", product.name);
    // Add to cart logic here
  };

  const handleProductClick = (product) => {
    console.log("Navigate to product:", product.name);
    // Navigate to product page
  };

  return (
    <SectionContainer>
      <Container maxWidth="xl">
        {/* Section Header */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              fontWeight: "bold",
              color: "text.primary",
              marginBottom: 2,
            }}
          >
            Everyone's Favorites
          </Typography>

          <Typography
            variant="h6"
            component="p"
            sx={{
              fontSize: { xs: "1rem", sm: "1.1rem" },
              color: "text.secondary",
              fontWeight: 300,
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Discover the pieces our community loves most. These customer
            favorites combine timeless style with sustainable craftsmanship.
          </Typography>
        </Box>

        {/* Product Carousel */}
        <CarouselContainer>
          {/* Previous Button */}
          <NavigationButton
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            position="left"
          >
            <ArrowBackIos />
          </NavigationButton>

          {/* Product Cards */}
          <ProductCarousel currentIndex={currentIndex}>
            {favoriteProducts.map((product) => (
              <ProductCard
                key={product.id}
                onClick={() => handleProductClick(product)}
              >
                <ProductImage image={product.image} title={product.name} />

                <ProductActions>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToWishlist(product);
                    }}
                    sx={{ color: "white" }}
                  >
                    <FavoriteOutlined />
                  </IconButton>

                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    sx={{ color: "white" }}
                  >
                    <ShoppingBagOutlined />
                  </IconButton>
                </ProductActions>

                <ProductInfo>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      fontWeight: 500,
                      fontSize: "1rem",
                      marginBottom: 0.5,
                      color: "text.primary",
                    }}
                  >
                    {product.name}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        color: "text.primary",
                      }}
                    >
                      ${product.price}
                    </Typography>

                    {product.originalPrice && (
                      <Typography
                        variant="body2"
                        sx={{
                          textDecoration: "line-through",
                          color: "text.secondary",
                        }}
                      >
                        ${product.originalPrice}
                      </Typography>
                    )}
                  </Box>

                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      fontSize: "0.75rem",
                    }}
                  >
                    {product.colors.join(" • ")} • ⭐ {product.rating} (
                    {product.reviews})
                  </Typography>
                </ProductInfo>
              </ProductCard>
            ))}
          </ProductCarousel>

          {/* Next Button */}
          <NavigationButton
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
            position="right"
          >
            <ArrowForwardIos />
          </NavigationButton>
        </CarouselContainer>
      </Container>
    </SectionContainer>
  );
};

export default CustomerFavorites;
