import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  IconButton,
  Avatar,
  Chip,
} from "@mui/material";
import {
  Instagram,
  FavoriteOutlined,
  Favorite,
  Share,
  ShoppingBag,
} from "@mui/icons-material";
import {
  SectionContainer,
  SectionHeader,
  SocialGrid,
  SocialCard,
  SocialImage,
  SocialOverlay,
  SocialActions,
  UserInfo,
  ProductTag,
} from "./SocialFeed.theme";

const SocialFeed = () => {
  const [likedPosts, setLikedPosts] = useState(new Set());

  // Social feed posts data
  const socialPosts = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1494790108755-2616c898834b?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      user: {
        username: "sarah_style",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616c898834b?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
        location: "New York, NY",
      },
      product: {
        name: "The Cashmere Crew",
        price: 128,
      },
      likes: 247,
      caption: "Perfect for those cozy fall days ✨",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      user: {
        username: "mike_minimal",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
        location: "San Francisco, CA",
      },
      product: {
        name: "The Organic Cotton Tee",
        price: 32,
      },
      likes: 156,
      caption: "Simple, sustainable, perfect 👌",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      user: {
        username: "anna_adventures",
        avatar:
          "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
        location: "Los Angeles, CA",
      },
      product: {
        name: "The Silk Blouse",
        price: 98,
      },
      likes: 189,
      caption: "Date night ready in sustainable style 💫",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      user: {
        username: "james_urban",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
        location: "Chicago, IL",
      },
      product: {
        name: "The Denim Jacket",
        price: 118,
      },
      likes: 203,
      caption: "Weekend vibes with conscious fashion 🌱",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      user: {
        username: "emma_essence",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616c898834b?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
        location: "Seattle, WA",
      },
      product: {
        name: "The Wool Cardigan",
        price: 148,
      },
      likes: 167,
      caption: "Cozy layers for the perfect autumn look 🍂",
    },
  ];

  const handleLike = (postId) => {
    setLikedPosts((prev) => {
      const newLiked = new Set(prev);
      if (newLiked.has(postId)) {
        newLiked.delete(postId);
      } else {
        newLiked.add(postId);
      }
      return newLiked;
    });
  };

  const handleShare = (post) => {
    console.log("Share post:", post.id);
    // Share functionality
  };

  const handleShopProduct = (post) => {
    console.log("Shop product:", post.product.name);
    // Navigate to product page
  };

  const handleFollowInstagram = () => {
    console.log("Follow on Instagram");
    // Open Instagram profile
  };

  return (
    <SectionContainer>
      <Container maxWidth="xl">
        {/* Section Header */}
        <SectionHeader>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              fontWeight: "bold",
              color: "text.primary",
              marginBottom: 2,
              textAlign: "center",
            }}
          >
            Everlane On You
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
              textAlign: "center",
              marginBottom: 4,
            }}
          >
            See how our community styles their favorite pieces. Share your look
            with #EverlaneOnYou for a chance to be featured.
          </Typography>

          {/* Follow Instagram Button */}
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <IconButton
              onClick={handleFollowInstagram}
              sx={{
                backgroundColor: "#E4405F",
                color: "white",
                width: 56,
                height: 56,
                "&:hover": {
                  backgroundColor: "#C13584",
                  transform: "scale(1.05)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <Instagram fontSize="large" />
            </IconButton>

            <Typography
              variant="body2"
              sx={{
                mt: 1,
                color: "text.secondary",
                fontWeight: 500,
              }}
            >
              @everlane
            </Typography>
          </Box>
        </SectionHeader>

        {/* Social Posts Grid */}
        <SocialGrid>
          {socialPosts.map((post) => (
            <SocialCard key={post.id}>
              <SocialImage
                image={post.image}
                title={`${post.user.username} wearing ${post.product.name}`}
              />

              <SocialOverlay className="social-overlay">
                {/* User Info */}
                <UserInfo>
                  <Avatar
                    src={post.user.avatar}
                    alt={post.user.username}
                    sx={{ width: 32, height: 32, mr: 1 }}
                  />

                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: "white",
                        fontSize: "0.875rem",
                      }}
                    >
                      @{post.user.username}
                    </Typography>

                    <Typography
                      variant="caption"
                      sx={{
                        color: "rgba(255,255,255,0.8)",
                        fontSize: "0.75rem",
                      }}
                    >
                      {post.user.location}
                    </Typography>
                  </Box>
                </UserInfo>

                {/* Product Tag */}
                <ProductTag onClick={() => handleShopProduct(post)}>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 600,
                      fontSize: "0.75rem",
                    }}
                  >
                    {post.product.name}
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: "0.75rem",
                      opacity: 0.9,
                    }}
                  >
                    ${post.product.price}
                  </Typography>
                </ProductTag>

                {/* Social Actions */}
                <SocialActions>
                  <IconButton
                    onClick={() => handleLike(post.id)}
                    sx={{ color: "white", p: 0.5 }}
                  >
                    {likedPosts.has(post.id) ? (
                      <Favorite sx={{ color: "#ff3040" }} />
                    ) : (
                      <FavoriteOutlined />
                    )}
                  </IconButton>

                  <Typography
                    variant="caption"
                    sx={{ color: "white", mr: 2, fontSize: "0.75rem" }}
                  >
                    {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                  </Typography>

                  <IconButton
                    onClick={() => handleShare(post)}
                    sx={{ color: "white", p: 0.5 }}
                  >
                    <Share fontSize="small" />
                  </IconButton>

                  <IconButton
                    onClick={() => handleShopProduct(post)}
                    sx={{ color: "white", p: 0.5 }}
                  >
                    <ShoppingBag fontSize="small" />
                  </IconButton>
                </SocialActions>

                {/* Caption */}
                <Typography
                  variant="body2"
                  sx={{
                    color: "white",
                    fontSize: "0.875rem",
                    lineHeight: 1.3,
                    mt: 1,
                  }}
                >
                  {post.caption}
                </Typography>
              </SocialOverlay>
            </SocialCard>
          ))}
        </SocialGrid>
      </Container>
    </SectionContainer>
  );
};

export default SocialFeed;
