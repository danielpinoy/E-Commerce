import React from "react";
import {
  Container,
  Typography,
  Link,
  IconButton,
  Divider,
  Box,
} from "@mui/material";
import {
  Instagram,
  Twitter,
  Facebook,
  YouTube,
  LocalShipping,
  Autorenew,
  LocationOn,
} from "@mui/icons-material";
import {
  FooterContainer,
  FooterContent,
  FooterSection,
  LinksGrid,
  SocialSection,
  BottomSection,
  ServiceFeatures,
  FeatureItem,
  FooterNewsletter,
} from "./Footer.theme";
import EmailSignup from "./EmailSignup";

const Footer = () => {
  // Footer navigation links organized by category
  const footerLinks = {
    Shop: [
      { name: "Women", href: "/women" },
      { name: "Men", href: "/men" },
      { name: "Shoes", href: "/shoes" },
      { name: "Accessories", href: "/accessories" },
      { name: "Sale", href: "/sale" },
    ],
    About: [
      { name: "Our Story", href: "/about" },
      { name: "Sustainability", href: "/sustainability" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Investors", href: "/investors" },
    ],
    "Customer Care": [
      { name: "Contact Us", href: "/contact" },
      { name: "Size Guide", href: "/size-guide" },
      { name: "Shipping & Returns", href: "/shipping" },
      { name: "FAQ", href: "/faq" },
      { name: "Track Your Order", href: "/track-order" },
    ],
    Account: [
      { name: "Sign In", href: "/signin" },
      { name: "Create Account", href: "/signup" },
      { name: "My Orders", href: "/orders" },
      { name: "Wishlist", href: "/wishlist" },
      { name: "Gift Cards", href: "/gift-cards" },
    ],
  };

  // Social media links
  const socialLinks = [
    {
      name: "Instagram",
      icon: <Instagram />,
      href: "https://instagram.com/everlane",
      color: "#E4405F",
    },
    {
      name: "Twitter",
      icon: <Twitter />,
      href: "https://twitter.com/everlane",
      color: "#1DA1F2",
    },
    {
      name: "Facebook",
      icon: <Facebook />,
      href: "https://facebook.com/everlane",
      color: "#1877F2",
    },
    {
      name: "YouTube",
      icon: <YouTube />,
      href: "https://youtube.com/everlane",
      color: "#FF0000",
    },
  ];

  // Service features
  const serviceFeatures = [
    {
      icon: <LocalShipping />,
      title: "Free Shipping",
      description: "On orders over $75",
    },
    {
      icon: <Autorenew />,
      title: "Free Returns",
      description: "Within 30 days",
    },
    {
      icon: <LocationOn />,
      title: "Find a Store",
      description: "12 locations nationwide",
    },
  ];

  const handleLinkClick = (href) => {
    console.log("Navigate to:", href);
    // In a real app: navigate(href)
  };

  const handleSocialClick = (social) => {
    console.log("Open social:", social.name);
    // Open social media link
  };

  const handleNewsletterSubmit = async (email) => {
    console.log("Footer newsletter signup:", email);
    // Newsletter signup logic
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <FooterContainer>
      <Container maxWidth="xl">
        <FooterContent>
          {/* Service Features */}
          <ServiceFeatures>
            {serviceFeatures.map((feature, index) => (
              <FeatureItem key={index}>
                <Box sx={{ color: "primary.main", mr: 2 }}>{feature.icon}</Box>
                <Box>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 600, color: "text.primary", mb: 0.5 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", fontSize: "0.875rem" }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              </FeatureItem>
            ))}
          </ServiceFeatures>

          <Divider sx={{ my: 6 }} />

          {/* Main Footer Content */}
          <LinksGrid>
            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <FooterSection key={category}>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    marginBottom: 3,
                    color: "text.primary",
                    fontSize: "1.1rem",
                  }}
                >
                  {category}
                </Typography>

                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
                >
                  {links.map((link) => (
                    <Link
                      key={link.name}
                      component="button"
                      onClick={() => handleLinkClick(link.href)}
                      sx={{
                        color: "text.secondary",
                        textDecoration: "none",
                        fontSize: "0.875rem",
                        textAlign: "left",
                        cursor: "pointer",
                        transition: "color 0.2s ease",
                        "&:hover": {
                          color: "text.primary",
                          textDecoration: "underline",
                        },
                      }}
                    >
                      {link.name}
                    </Link>
                  ))}
                </Box>
              </FooterSection>
            ))}

            {/* Newsletter Signup */}
            <FooterSection>
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  fontWeight: 600,
                  marginBottom: 3,
                  color: "text.primary",
                  fontSize: "1.1rem",
                }}
              >
                Stay Connected
              </Typography>

              <FooterNewsletter>
                <EmailSignup
                  title=""
                  subtitle="Get the latest updates on new arrivals, sales, and sustainability initiatives."
                  placeholder="Enter your email"
                  buttonText="Subscribe"
                  onSubmit={handleNewsletterSubmit}
                  variant="light"
                  compactMode={true}
                />
              </FooterNewsletter>

              {/* Social Media Links */}
              <SocialSection>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    marginBottom: 2,
                    fontWeight: 500,
                  }}
                >
                  Follow Us
                </Typography>

                <Box sx={{ display: "flex", gap: 1 }}>
                  {socialLinks.map((social) => (
                    <IconButton
                      key={social.name}
                      onClick={() => handleSocialClick(social)}
                      sx={{
                        color: "text.secondary",
                        backgroundColor: "transparent",
                        border: "1px solid",
                        borderColor: "divider",
                        width: 40,
                        height: 40,
                        "&:hover": {
                          color: social.color,
                          borderColor: social.color,
                          backgroundColor: `${social.color}10`,
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  ))}
                </Box>
              </SocialSection>
            </FooterSection>
          </LinksGrid>

          <Divider sx={{ my: 6 }} />

          {/* Bottom Section */}
          <BottomSection>
            <Box>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: "bold",
                  marginBottom: 1,
                  color: "text.primary",
                }}
              >
                EVERLANE
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  maxWidth: 400,
                  lineHeight: 1.6,
                }}
              >
                Modern essentials. Ethical manufacturing. Radical transparency.
                We're on a mission to clean up the industry.
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  marginBottom: 2,
                }}
              >
                © 2025 Everlane. All rights reserved.
              </Typography>

              <Box sx={{ display: "flex", gap: 3 }}>
                <Link
                  component="button"
                  onClick={() => handleLinkClick("/privacy")}
                  sx={{
                    color: "text.secondary",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    "&:hover": {
                      color: "text.primary",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Privacy Policy
                </Link>

                <Link
                  component="button"
                  onClick={() => handleLinkClick("/terms")}
                  sx={{
                    color: "text.secondary",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    "&:hover": {
                      color: "text.primary",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Terms of Service
                </Link>

                <Link
                  component="button"
                  onClick={() => handleLinkClick("/accessibility")}
                  sx={{
                    color: "text.secondary",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    "&:hover": {
                      color: "text.primary",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Accessibility
                </Link>
              </Box>
            </Box>
          </BottomSection>
        </FooterContent>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
