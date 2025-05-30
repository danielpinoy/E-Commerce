import React from "react";
import { Box, Container, Typography, Grid, Button } from "@mui/material";
import {
  SectionContainer,
  CategoryCard,
  CategoryImage,
  CategoryContent,
} from "./Category.theme";

const Category = () => {
  // example data
  const categories = [
    {
      id: 1,
      name: "SHIRTS",
      image:
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Classic and contemporary styles",
      slug: "shirts",
    },
    {
      id: 2,
      name: "JEANS",
      image:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Sustainable denim essentials",
      slug: "jeans",
    },
    {
      id: 3,
      name: "TEES",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Everyday comfort basics",
      slug: "tees",
    },
    {
      id: 4,
      name: "DENIM",
      image:
        "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Premium denim collection",
      slug: "denim",
    },
    {
      id: 5,
      name: "SWEATERS",
      image:
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Cozy knits for every season",
      slug: "sweaters",
    },
  ];

  const handleCategoryClick = (category) => {
    // Navigate to category page
    console.log("Navigate to category:", category.slug);
  };

  return (
    <SectionContainer>
      <Container maxWidth="lg">
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
            Shop by Category
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
            Discover our carefully curated collections, designed with
            sustainability and style in mind.
          </Typography>
        </Box>

        {/* Category Grid */}
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {categories.map((category) => (
            <Grid sm={4} md={4} key={category.id}>
              <CategoryCard onClick={() => handleCategoryClick(category)}>
                <CategoryImage image={category.image} title={category.name} />

                <CategoryContent>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                      marginBottom: 1,
                      color: "text.primary",
                    }}
                  >
                    {category.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      fontSize: { xs: "0.75rem", sm: "0.875rem" },
                      display: { xs: "none", sm: "block" },
                    }}
                  >
                    {category.description}
                  </Typography>

                  <Button
                    variant="text"
                    sx={{
                      mt: 2,
                      color: "black",
                      textTransform: "none",
                      fontWeight: 500,
                      fontSize: "0.875rem",
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.04)",
                        textDecoration: "underline",
                      },
                      display: { xs: "none", sm: "inline-flex" },
                    }}
                  >
                    Shop Now
                  </Button>
                </CategoryContent>
              </CategoryCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </SectionContainer>
  );
};

export default Category;
