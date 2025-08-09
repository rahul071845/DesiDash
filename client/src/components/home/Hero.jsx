import { Box, Typography, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Hero = () => {
  return (
    <Box
      sx={{
        height: "40vh",
        backgroundImage:
          "url(https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textShadow: "2px 2px 4px rgba(0,0,0,0.6)",
      }}
    >
      <Typography variant="h2" component="h1" fontWeight="bold">
        Unexpected cravings?
      </Typography>
      <Typography variant="h5">
        Order from your favourite restaurants.
      </Typography>
      <TextField
        variant="filled"
        placeholder="Search for restaurants or dishes..."
        sx={{ mt: 4, width: "50%", backgroundColor: "white", borderRadius: 1 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default Hero;
