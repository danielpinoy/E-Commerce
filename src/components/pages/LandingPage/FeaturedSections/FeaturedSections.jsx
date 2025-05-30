import React from "react";
import { Container, Typography, Button } from "@mui/material";
import {
  SectionContainer,
  FeaturedGrid,
  FeatureCard,
  FeatureImage,
  FeatureContent,
  FeatureOverlay,
} from "./FeaturedSections.theme";

const FeaturedSections = () => {
  // example data
  const featuredSections = [
    {
      id: 1,
      title: "New Arrivals",
      subtitle: "Fresh styles for the season",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      buttonText: "Shop New",
      link: "/new-arrivals",
      theme: "dark",
    },
    {
      id: 2,
      title: "Best Sellers",
      subtitle: "Customer favorites",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616c898834b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      buttonText: "Shop Best Sellers",
      link: "/best-sellers",
      theme: "light",
    },
    {
      id: 3,
      title: "The Holiday Outfit",
      subtitle: "Perfect for celebrations",
      image:
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      buttonText: "Shop Holiday",
      link: "/holiday-collection",
      theme: "dark",
    },
  ];

  const handleSectionClick = (section) => {
    console.log("Navigate to section:", section.link);
    // navigate(section.link)
  };

  return (
    <SectionContainer>
      <Container maxWidth="xl">
        <FeaturedGrid>
          {featuredSections.map((section) => (
            <FeatureCard
              key={section.id}
              onClick={() => handleSectionClick(section)}
            >
              <FeatureImage image={section.image} title={section.title} />

              <FeatureOverlay colorTheme={section.theme}>
                <FeatureContent>
                  <Typography
                    variant="h4"
                    component="h3"
                    sx={{
                      fontWeight: "bold",
                      marginBottom: 1,
                      fontSize: { xs: "1.5rem", sm: "2rem", md: "2.25rem" },
                      color: section.theme === "dark" ? "white" : "black",
                    }}
                  >
                    {section.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      marginBottom: 3,
                      fontSize: { xs: "0.9rem", sm: "1rem" },
                      color:
                        section.theme === "dark"
                          ? "rgba(255,255,255,0.9)"
                          : "rgba(0,0,0,0.8)",
                    }}
                  >
                    {section.subtitle}
                  </Typography>

                  <Button
                    variant={
                      section.theme === "dark" ? "outlined" : "contained"
                    }
                    sx={{
                      textTransform: "none",
                      fontWeight: 500,
                      px: 3,
                      py: 1,
                      ...(section.theme === "dark"
                        ? {
                            borderColor: "white",
                            color: "white",
                            "&:hover": {
                              borderColor: "white",
                              backgroundColor: "rgba(255,255,255,0.1)",
                            },
                          }
                        : {
                            backgroundColor: "black",
                            color: "white",
                            "&:hover": {
                              backgroundColor: "rgba(0,0,0,0.8)",
                            },
                          }),
                    }}
                  >
                    {section.buttonText}
                  </Button>
                </FeatureContent>
              </FeatureOverlay>
            </FeatureCard>
          ))}
        </FeaturedGrid>
      </Container>
    </SectionContainer>
  );
};

export default FeaturedSections;
