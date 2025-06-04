import React, { useEffect } from "react";
import { Box, Container, Typography, Grid, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../../redux/slices/productSlice";
import {
  SectionContainer,
  CategoryCard,
  CategoryImage,
  CategoryContent,
} from "./Category.theme";

const Category = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  // Fetch products when component mounts
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Placeholder images for different categories
  const categoryImages = {
    shirts:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    jeans:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    tees: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    denim:
      "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    sweaters:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    shoes:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    accessories:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    default:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  };

  // Get unique categories from products
  const getCategories = () => {
    if (!products || products.length === 0) return [];

    // Group products by category and count them
    const categoryMap = products.reduce((acc, product) => {
      const category = product.category?.toLowerCase() || "other";

      if (!acc[category]) {
        acc[category] = {
          name: product.category || "Other",
          count: 0,
          products: [],
        };
      }

      acc[category].count++;
      acc[category].products.push(product);
      return acc;
    }, {});

    // Convert to array and add images
    return Object.entries(categoryMap).map(([key, value]) => ({
      id: key,
      name: value.name.toUpperCase(),
      slug: key,
      count: value.count,
      products: value.products,
      image: categoryImages[key] || categoryImages.default,
      description: `${value.count} item${
        value.count !== 1 ? "s" : ""
      } available`,
    }));
  };

  const categories = getCategories();

  const handleCategoryClick = (category) => {
    // Navigate to category page or filter products
    console.log("Navigate to category:", category.slug);
    console.log("Products in this category:", category.products);
    // You can dispatch a filter action or navigate to a category page here
  };

  if (loading) {
    return (
      <SectionContainer>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6">Loading categories...</Typography>
          </Box>
        </Container>
      </SectionContainer>
    );
  }

  if (error) {
    return (
      <SectionContainer>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="error">
              Error loading categories: {error}
            </Typography>
          </Box>
        </Container>
      </SectionContainer>
    );
  }

  if (categories.length === 0) {
    return (
      <SectionContainer>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6">No categories available</Typography>
          </Box>
        </Container>
      </SectionContainer>
    );
  }

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
            <Grid item xs={12} sm={6} md={4} key={category.id}>
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
                      mb: 1,
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
                    Shop Now ({category.count})
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
