import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { ArrowForward, CardGiftcard, Park } from "@mui/icons-material";
import {
  SectionContainer,
  ContentGrid,
  ContentCard,
  CardImage,
  CardContent,
  CardOverlay,
} from "./HolidayGiftPicks.theme";

const HolidayGiftPicks = () => {
  // example Content sections data
  const contentSections = [
    {
      id: "holiday-gifts",
      title: "Our Holiday Gift Picks",
      subtitle: "Thoughtfully curated presents for everyone on your list",
      description:
        "From cozy essentials to timeless classics, discover the perfect gifts that blend style with sustainability. Each piece is chosen for its quality, versatility, and lasting appeal.",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      buttonText: "Shop Gift Guide",
      buttonIcon: <CardGiftcard />,
      link: "/gift-guide",
      theme: "warm",
      accentColor: "#d2691e",
    },
    {
      id: "cleaner-fashion",
      title: "Cleaner Fashion",
      subtitle: "Our commitment to sustainable and ethical practices",
      description:
        "Learn about our journey toward zero waste, responsible sourcing, and transparent manufacturing. See how we're working to create positive change in the fashion industry.",
      image:
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      buttonText: "Learn More",
      buttonIcon: <Park />,
      link: "/sustainability",
      theme: "natural",
      accentColor: "#228b22",
    },
  ];

  const handleSectionClick = (section) => {
    console.log("Navigate to:", section.link);
    // In a real app: navigate(section.link)
  };

  return (
    <SectionContainer>
      <Container maxWidth="xl">
        <ContentGrid>
          {contentSections.map((section) => (
            <ContentCard
              key={section.id}
              onClick={() => handleSectionClick(section)}
              colorTheme={section.theme}
            >
              <CardImage image={section.image} title={section.title} />

              <CardOverlay colorTheme={section.theme}>
                <CardContent>
                  {/* Section Title */}
                  <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                      fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.5rem" },
                      fontWeight: "bold",
                      marginBottom: 2,
                      color: "white",
                      textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                      lineHeight: 1.2,
                    }}
                  >
                    {section.title}
                  </Typography>

                  {/* Subtitle */}
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      fontSize: { xs: "1rem", sm: "1.1rem" },
                      fontWeight: 400,
                      marginBottom: 3,
                      color: "rgba(255,255,255,0.95)",
                      textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                      lineHeight: 1.4,
                    }}
                  >
                    {section.subtitle}
                  </Typography>

                  {/* Description */}
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: "0.9rem", sm: "1rem" },
                      marginBottom: 4,
                      color: "rgba(255,255,255,0.9)",
                      textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                      lineHeight: 1.5,
                      display: { xs: "none", sm: "block" }, // Hide on mobile for cleaner look
                    }}
                  >
                    {section.description}
                  </Typography>

                  {/* Action Button */}
                  <Button
                    variant="contained"
                    endIcon={section.buttonIcon}
                    sx={{
                      backgroundColor: section.accentColor,
                      color: "white",
                      fontWeight: 600,
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: "none",
                      fontSize: { xs: "0.9rem", sm: "1rem" },
                      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                      "&:hover": {
                        backgroundColor: section.accentColor,
                        filter: "brightness(0.9)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 16px rgba(0,0,0,0.4)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    {section.buttonText}
                  </Button>
                </CardContent>
              </CardOverlay>
            </ContentCard>
          ))}
        </ContentGrid>
      </Container>
    </SectionContainer>
  );
};

export default HolidayGiftPicks;
