import React from "react";
import { Container, Typography, Button } from "@mui/material";
import {
  MissionContainer,
  ContentWrapper,
  MissionEmailSignup,
} from "./MissionSection.theme";

const MissionSection = () => {
  return (
    <MissionContainer>
      <Container maxWidth="md">
        <ContentWrapper>
          {/* Main Mission Statement */}
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontSize: { xs: "2rem", sm: "2.75rem", md: "3.25rem" },
              fontWeight: "bold",
              marginBottom: 3,
              color: "white",
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            We're on a Mission To Clean Up the Industry
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="h6"
            component="p"
            sx={{
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
              fontWeight: 300,
              marginBottom: 4,
              color: "rgba(255,255,255,0.95)",
              textAlign: "center",
              maxWidth: "700px",
              margin: "0 auto",
              lineHeight: 1.5,
            }}
          >
            Read about our progress in our latest Impact Report.
          </Typography>

          {/* Call to Action Buttons */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              marginBottom: "48px",
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              onClick={() => {}} // Empty for now
              sx={{
                backgroundColor: "white",
                color: "#2e7d32",
                fontWeight: 600,
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1rem",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.9)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Learn Our Story
            </Button>
          </div>
        </ContentWrapper>
      </Container>
    </MissionContainer>
  );
};

export default MissionSection;
