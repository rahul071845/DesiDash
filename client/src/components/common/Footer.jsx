import { 
  Box, 
  Container, 
  IconButton, 
  Typography, 
  Link, 
  Stack,
  Divider
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FacebookIcon, href: "https://facebook.com", label: "Facebook" },
    { icon: TwitterIcon, href: "https://twitter.com", label: "Twitter" },
    { icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
  ];

  const footerLinks = [
    { text: "About Us", to: "/about" },
    { text: "Contact", to: "/contact" },
    { text: "Privacy Policy", to: "/privacy" },
    { text: "Terms of Service", to: "/terms" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "background.paper",
        borderTop: "2px solid",
        borderColor: "primary.main",
        mt: "auto",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Main Footer Content */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={3}
          sx={{ mb: 3 }}
        >
          {/* Brand Section */}
          <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontFamily: "Poppins, Arial, sans-serif",
                fontWeight: 700,
                color: "primary.main",
                mb: 1,
              }}
            >
              DesiDash
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                maxWidth: "300px",
                lineHeight: 1.5,
              }}
            >
              Authentic flavors delivered to your doorstep
            </Typography>
          </Box>

          {/* Navigation Links */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 3 }}
            alignItems="center"
          >
            {footerLinks.map((link) => (
              <Link
                key={link.text}
                component={RouterLink}
                to={link.to}
                color="text.primary"
                sx={{
                  textDecoration: "none",
                  fontFamily: "Lato, Arial, sans-serif",
                  fontSize: "0.95rem",
                  transition: "all 0.3s ease",
                  position: "relative",
                  "&:hover": {
                    color: "primary.main",
                    "&::after": {
                      width: "100%",
                    },
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: "-2px",
                    left: 0,
                    width: "0%",
                    height: "2px",
                    backgroundColor: "primary.main",
                    transition: "width 0.3s ease",
                  },
                }}
              >
                {link.text}
              </Link>
            ))}
          </Stack>

          {/* Social Media Icons */}
          <Stack direction="row" spacing={1}>
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <IconButton
                  key={social.label}
                  aria-label={social.label}
                  component="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{
                    color: "text.secondary",
                    backgroundColor: "background.default",
                    border: "1px solid",
                    borderColor: "divider",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: "primary.main",
                      backgroundColor: "primary.light",
                      borderColor: "primary.main",
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(230, 126, 34, 0.3)",
                    },
                  }}
                >
                  <IconComponent fontSize="small" />
                </IconButton>
              );
            })}
          </Stack>
        </Stack>

        <Divider sx={{ borderColor: "divider" }} />

        {/* Copyright Section */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ pt: 3 }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontFamily: "Lato, Arial, sans-serif",
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            © {currentYear}{" "}
            <Link
              color="primary.main"
              component={RouterLink}
              to="/"
              sx={{
                textDecoration: "none",
                fontWeight: 500,
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              DesiDash
            </Link>
            . All rights reserved.
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontFamily: "Lato, Arial, sans-serif",
              fontSize: "0.85rem",
              textAlign: { xs: "center", sm: "right" },
            }}
          >
            Made with ❤️ for food lovers
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;