import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateRestaurantMutation } from "../../store/apiSlice";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
  CircularProgress,
  InputAdornment,
  Alert,
} from "@mui/material";
import {
  Restaurant as RestaurantIcon,
  LocationOn as LocationIcon,
  Dining as CuisineIcon,
  Image as ImageIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { toast } from "react-hot-toast";

const CreateRestaurantPage = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const [createRestaurant, { isLoading }] = useCreateRestaurantMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !address || !cuisine) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      await createRestaurant({ name, address, cuisine, imageUrl }).unwrap();
      toast.success("Restaurant created successfully!");
      navigate("/dashboard");
    } catch (err) {
      const errorMessage = err?.data?.message || "Failed to create restaurant";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
        }}
      >
        <Paper
          elevation={8}
          sx={{
            p: 4,
            width: "100%",
            borderRadius: 3,
            background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <RestaurantIcon
              sx={{ fontSize: 48, color: "primary.main", mb: 2 }}
            />
            <Typography
              variant="h4"
              sx={{
                fontFamily: "Poppins, Arial, sans-serif",
                fontWeight: 700,
                color: "primary.main",
                mb: 1,
              }}
            >
              Add New Restaurant
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                fontFamily: "Lato, Arial, sans-serif",
              }}
            >
              Fill in the details to create your restaurant
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert
              severity="error"
              sx={{ mb: 3, borderRadius: 2 }}
              onClose={() => setError("")}
            >
              {error}
            </Alert>
          )}

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Restaurant Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <RestaurantIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&:hover fieldset": {
                    borderColor: "primary.main",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main",
                  },
                },
              }}
            />

            <TextField
              label="Full Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
              required
              margin="normal"
              multiline
              rows={2}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{ alignSelf: "flex-start", mt: 1 }}
                  >
                    <LocationIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&:hover fieldset": {
                    borderColor: "primary.main",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main",
                  },
                },
              }}
            />

            <TextField
              label="Cuisine Type"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              fullWidth
              required
              margin="normal"
              placeholder="e.g., North Indian, Chinese, Italian"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CuisineIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&:hover fieldset": {
                    borderColor: "primary.main",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main",
                  },
                },
              }}
            />

            <TextField
              label="Restaurant Image URL (Optional)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ImageIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&:hover fieldset": {
                    borderColor: "primary.main",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main",
                  },
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              startIcon={
                isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <AddIcon />
                )
              }
              sx={{
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1.1rem",
                fontWeight: 600,
                fontFamily: "Lato, Arial, sans-serif",
                bgcolor: "primary.main",
                "&:hover": {
                  bgcolor: "primary.dark",
                  transform: "translateY(-1px)",
                  boxShadow: "0 4px 12px rgba(230, 126, 34, 0.3)",
                },
                "&:disabled": {
                  bgcolor: "primary.light",
                },
                transition: "all 0.3s ease",
              }}
            >
              {isLoading ? "Creating Restaurant..." : "Create Restaurant"}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default CreateRestaurantPage;
