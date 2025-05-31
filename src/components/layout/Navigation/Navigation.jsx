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
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Search as SearchIcon,
  ShoppingBag as ShoppingBagIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
  Logout,
  AccountCircle,
  ShoppingCart,
  Favorite,
  Edit,
  Delete,
} from "@mui/icons-material";
import SearchBar from "../../Common/UI/SearchBar";
import AuthModal from "../../auth/AuthModal";
import EditProfileModal from "../../auth/profile/EditProfileModal";
import DeleteAccountModal from "../../auth/profile/DeleteAccountModal";
import { useAuth } from "../../../hooks/useAuth";

const Navigation = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [editProfileOpen, setEditProfileOpen] = useState(false); // 🆕 Edit profile state
  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false); // 🆕 Delete account state

  const { user, isAuthenticated, logout } = useAuth();

  // Navigation items
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

  // Auth handlers
  const handleLoginClick = () => {
    setAuthMode("login");
    setAuthModalOpen(true);
  };

  const handleSignupClick = () => {
    setAuthMode("signup");
    setAuthModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  //  Profile handlers
  const handleEditProfile = () => {
    setEditProfileOpen(true);
    handleMenuClose();
  };

  const handleDeleteAccount = () => {
    setDeleteAccountOpen(true);
    handleMenuClose();
  };

  const handleOrdersClick = () => {
    console.log("Navigate to orders");
    handleMenuClose();
  };

  const handleWishlistClick = () => {
    console.log("Navigate to wishlist");
    handleMenuClose();
  };

  return (
    <>
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

            {/* Account Section */}
            {isAuthenticated ? (
              // Logged in user menu
              <>
                <IconButton color="inherit" onClick={handleMenuOpen}>
                  <Avatar
                    src={user?.avatar}
                    alt={user?.name}
                    sx={{ width: 32, height: 32 }}
                  >
                    {user?.name?.charAt(0)}
                  </Avatar>
                </IconButton>
              </>
            ) : (
              // Guest user buttons
              <>
                <Button
                  color="inherit"
                  onClick={handleLoginClick}
                  sx={{
                    textTransform: "none",
                    display: { xs: "none", sm: "inline-flex" },
                  }}
                >
                  Sign In
                </Button>
                <IconButton
                  color="inherit"
                  onClick={handleLoginClick}
                  sx={{ display: { xs: "inline-flex", sm: "none" } }}
                >
                  <PersonIcon />
                </IconButton>
              </>
            )}

            {/* Cart Icon with Badge */}
            <IconButton color="inherit">
              <Badge badgeContent={2} color="error" variant="dot">
                <ShoppingBagIcon />
              </Badge>
            </IconButton>
          </Box>

          {/*  Updated User Menu with Profile Options */}
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
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 220,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                border: "1px solid #e0e0e0",
              },
            }}
          >
            {isAuthenticated
              ? // Logged in user menu items
                [
                  <Box key="user-info" sx={{ px: 2, py: 1.5 }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {user?.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {user?.email}
                    </Typography>
                  </Box>,
                  <Divider key="divider1" />,
                  <MenuItem key="edit-profile" onClick={handleEditProfile}>
                    <ListItemIcon>
                      <Edit fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Edit Profile</ListItemText>
                  </MenuItem>,
                  <MenuItem key="orders" onClick={handleOrdersClick}>
                    <ListItemIcon>
                      <ShoppingCart fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>My Orders</ListItemText>
                  </MenuItem>,
                  <MenuItem key="wishlist" onClick={handleWishlistClick}>
                    <ListItemIcon>
                      <Favorite fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Wishlist</ListItemText>
                  </MenuItem>,
                  <Divider key="divider2" />,
                  <MenuItem key="delete-account" onClick={handleDeleteAccount}>
                    <ListItemIcon>
                      <Delete fontSize="small" color="error" />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography color="error">Delete Account</Typography>
                    </ListItemText>
                  </MenuItem>,
                  <MenuItem key="logout" onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Sign Out</ListItemText>
                  </MenuItem>,
                ]
              : // Guest user menu items
                [
                  <MenuItem key="login" onClick={handleLoginClick}>
                    <ListItemIcon>
                      <AccountCircle fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Sign In</ListItemText>
                  </MenuItem>,
                  <MenuItem key="signup" onClick={handleSignupClick}>
                    <ListItemIcon>
                      <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Create Account</ListItemText>
                  </MenuItem>,
                ]}
          </Menu>
        </Toolbar>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <Box
            sx={{
              display: { xs: "block", md: "none" },
              backgroundColor: "white",
              borderTop: "1px solid #e0e0e0",
              py: 2,
            }}
          >
            {menuItems.map((item) => (
              <Button
                key={item}
                color="inherit"
                fullWidth
                sx={{
                  justifyContent: "flex-start",
                  textTransform: "none",
                  py: 1,
                  px: 3,
                }}
              >
                {item}
              </Button>
            ))}
          </Box>
        )}
      </AppBar>

      {/* Auth Modal */}
      <AuthModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />

      {/*  Edit Profile Modal */}
      <EditProfileModal
        open={editProfileOpen}
        onClose={() => setEditProfileOpen(false)}
      />

      {/*  Delete Account Modal */}
      <DeleteAccountModal
        open={deleteAccountOpen}
        onClose={() => setDeleteAccountOpen(false)}
      />
    </>
  );
};

export default Navigation;
