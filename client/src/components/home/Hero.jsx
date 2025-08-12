import { Box, Typography, TextField, InputAdornment, Container } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Hero = () => {
  return (
    <Box
      sx={{
        height: "50vh",
        backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        display: "flex",
        alignItems: "center",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(135deg, rgba(230, 126, 34, 0.1) 0%, rgba(0, 128, 128, 0.1) 100%)",
        },
      }}
    >
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            textAlign: "center",
            color: "white",
          }}
        >
          {/* Main Heading */}
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontFamily: "Poppins, Arial, sans-serif",
              fontWeight: 700,
              mb: 2,
              textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
              fontSize: { xs: "1.8rem", md: "3rem" },
              lineHeight: 1.2,
            }}
          >
            Craving Something
            <Box component="span" sx={{ color: "#F39C12", ml: 1 }}>
              Delicious?
            </Box>
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Lato, Arial, sans-serif",
              fontWeight: 400,
              mb: 4,
              opacity: 0.95,
              textShadow: "1px 1px 4px rgba(0,0,0,0.6)",
              fontSize: { xs: "1.1rem", md: "1.3rem" },
            }}
          >
            Authentic flavors delivered from your favorite restaurants
          </Typography>

          {/* Search Bar */}
          <Box
            sx={{
              maxWidth: "500px",
              mx: "auto",
              position: "relative",
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Search restaurants, dishes, or cuisines..."
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  borderRadius: 3,
                  backdropFilter: "blur(10px)",
                  border: "2px solid transparent",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "white",
                    borderColor: "primary.light",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "white",
                    borderColor: "primary.main",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(230, 126, 34, 0.3)",
                  },
                  "& fieldset": {
                    border: "none",
                  },
                },
                "& input": {
                  py: 2,
                  fontSize: "1.1rem",
                  fontFamily: "Lato, Arial, sans-serif",
                  "&::placeholder": {
                    color: "text.secondary",
                    opacity: 0.8,
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon 
                      sx={{ 
                        color: "primary.main",
                        fontSize: "1.5rem",
                      }} 
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;