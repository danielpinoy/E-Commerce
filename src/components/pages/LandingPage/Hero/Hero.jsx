import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { HeroContainer, ContentWrapper, HeroEmailSignup } from "./Hero.theme";

const Hero = () => {
  const handleEmailSubmit = async (email) => {
    // Add your custom email signup logic here
    console.log("Hero email submitted:", email);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // success toast notification here later
    // toast.success('Thank you for signing up!');
  };

  return (
    <HeroContainer>
      <Container maxWidth="md">
        <ContentWrapper>
          {/* Main Heading */}
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
              fontWeight: "bold",
              marginBottom: 2,
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              letterSpacing: "-0.02em",
            }}
          >
            Your Cozy Era
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontSize: { xs: "1.1rem", sm: "1.3rem" },
              fontWeight: 300,
              marginBottom: 4,
              textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
              lineHeight: 1.4,
            }}
          >
            Embrace comfort and style with our latest collection. Thoughtfully
            designed for the moments that matter.
          </Typography>

          {/* Email Signup Card */}
          <HeroEmailSignup
            title="Stay in the Loop"
            subtitle="Be the first to know about new arrivals, exclusive offers, and sustainable fashion tips."
            placeholder="Enter your email address"
            buttonText="Sign Up"
            onSubmit={handleEmailSubmit}
            variant="medium"
          />
        </ContentWrapper>
      </Container>
    </HeroContainer>
  );
};

export default Hero;
