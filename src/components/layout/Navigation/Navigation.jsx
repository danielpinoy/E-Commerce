import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Search as SearchIcon,
  ShoppingBag as ShoppingBagIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import SearchBar from "../../Common/UI/SearchBar";

const Navigation = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // items navigation
  const menuItems = ["Women", "Men", "Shoes", "About", "Everworld"];

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearch = (value) => {
    setSearchValue(value);
    console.log("Searching for:", value);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "white",
        color: "black",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMobileMenuToggle}
            sx={{
              mr: 2,
              display: { xs: "block", md: "none" },
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: "bold",
              letterSpacing: "0.1em",
              fontSize: "1.2rem",
              cursor: "pointer",
            }}
          >
            EVERLANE
          </Typography>
        </Box>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 4,
          }}
        >
          {menuItems.map((item) => (
            <Button
              key={item}
              color="inherit"
              sx={{
                textTransform: "none",
                fontSize: "0.95rem",
                fontWeight: 400,
                "&:hover": {
                  backgroundColor: "transparent",
                  textDecoration: "underline",
                },
              }}
            >
              {item}
            </Button>
          ))}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <SearchBar
              placeholder="Search…"
              value={searchValue}
              onSearch={handleSearch}
            />
          </Box>

          {/* Search Icon - Mobile only */}
          <IconButton
            color="inherit"
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            <SearchIcon />
          </IconButton>

          {/* Account Icon */}
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <PersonIcon />
          </IconButton>

          {/* Cart Icon with Badge */}
          <IconButton color="inherit">
            <Badge badgeContent={2} color="error" variant="dot">
              <ShoppingBagIcon />
            </Badge>
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleMenuClose}>Sign In</MenuItem>
          <MenuItem onClick={handleMenuClose}>Create Account</MenuItem>
          <MenuItem onClick={handleMenuClose}>My Orders</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
