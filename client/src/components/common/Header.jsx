import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../store/apiSlice.js";
import { logout } from "../../store/authSlice.js";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import {
  ShoppingCart as ShoppingCartIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { totalItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [logoutApi] = useLogoutMutation();
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      setAnchorEl(null);
      setMobileMenuOpen(false);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: "primary.main" }}>
        <Toolbar>
          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              onClick={() => setMobileMenuOpen(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Brand Logo */}
          <Typography
            variant="h5"
            component={RouterLink}
            to="/"
            sx={{
              color: "inherit",
              textDecoration: "none",
              flexGrow: 1,
              fontFamily: "Poppins, Arial, sans-serif",
              fontWeight: 700,
            }}
          >
            DesiDash
          </Typography>

          {/* Cart Icon */}
          <IconButton
            component={RouterLink}
            to="/cart"
            color="inherit"
            sx={{ mr: 2 }}
          >
            <Badge 
              badgeContent={totalItems} 
              sx={{
                "& .MuiBadge-badge": {
                  bgcolor: "secondary.main",
                  color: "white",
                }
              }}
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* Desktop Auth Section */}
          {!isMobile && (
            <>
              {userInfo ? (
                <>
                  <Button
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    startIcon={
                      <Avatar sx={{ width: 28, height: 28, bgcolor: "secondary.main" }}>
                        {userInfo.user.name.charAt(0).toUpperCase()}
                      </Avatar>
                    }
                    sx={{ color: "inherit", textTransform: "none" }}
                  >
                    {userInfo.user.name}
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                  >
                    <MenuItem 
                      component={RouterLink} 
                      to="/profile"
                      onClick={() => setAnchorEl(null)}
                    >
                      <ListItemIcon><PersonIcon /></ListItemIcon>
                      <ListItemText>Profile</ListItemText>
                    </MenuItem>
                    {userInfo.user.role === "owner" && (
                      <MenuItem 
                        component={RouterLink} 
                        to="/dashboard"
                        onClick={() => setAnchorEl(null)}
                      >
                        <ListItemIcon><DashboardIcon /></ListItemIcon>
                        <ListItemText>Dashboard</ListItemText>
                      </MenuItem>
                    )}
                    <Divider />
                    <MenuItem onClick={logoutHandler}>
                      <ListItemIcon><LogoutIcon /></ListItemIcon>
                      <ListItemText>Logout</ListItemText>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button color="inherit" component={RouterLink} to="/login">
                    Login
                  </Button>
                  <Button 
                    variant="contained"
                    component={RouterLink} 
                    to="/register"
                    sx={{ 
                      bgcolor: "secondary.main",
                      "&:hover": { bgcolor: "secondary.dark" }
                    }}
                  >
                    Register
                  </Button>
                </Box>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <Box sx={{ width: 250, p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
              DesiDash
            </Typography>
            <IconButton onClick={() => setMobileMenuOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          
          <Divider sx={{ mb: 2 }} />
          
          <List>
            {userInfo ? (
              <>
                <ListItem disablePadding>
                  <ListItemButton 
                    component={RouterLink} 
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ListItemIcon><PersonIcon /></ListItemIcon>
                    <ListItemText primary="Profile" />
                  </ListItemButton>
                </ListItem>
                
                {userInfo.user.role === "owner" && (
                  <ListItem disablePadding>
                    <ListItemButton 
                      component={RouterLink} 
                      to="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <ListItemIcon><DashboardIcon /></ListItemIcon>
                      <ListItemText primary="Dashboard" />
                    </ListItemButton>
                  </ListItem>
                )}
                
                <ListItem disablePadding>
                  <ListItemButton onClick={logoutHandler}>
                    <ListItemIcon><LogoutIcon color="error" /></ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                </ListItem>
              </>
            ) : (
              <>
                <ListItem disablePadding>
                  <ListItemButton 
                    component={RouterLink} 
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ListItemIcon><LoginIcon /></ListItemIcon>
                    <ListItemText primary="Login" />
                  </ListItemButton>
                </ListItem>
                
                <ListItem disablePadding>
                  <ListItemButton 
                    component={RouterLink} 
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ListItemIcon><PersonAddIcon /></ListItemIcon>
                    <ListItemText primary="Register" />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;