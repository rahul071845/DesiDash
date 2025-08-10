import Hero from "../components/home/Hero.jsx";
import RestaurantCard from "../components/restaurants/RestaurantCard.jsx";
import RestaurantCardSkeleton from "../components/restaurants/RestaurantCardSkeleton.jsx";
import { useGetRestaurantsQuery } from "../store/apiSlice.js";
import { 
  Box, 
  Typography, 
  Grid, 
  Container, 
  Paper,
  Stack
} from "@mui/material";
import {
  Restaurant as RestaurantIcon,
  ErrorOutline as ErrorIcon,
} from "@mui/icons-material";

const HomePage = () => {
  const { data: restaurants = [], isLoading, error } = useGetRestaurantsQuery();

  // Loading State
  if (isLoading) {
    return (
      <Box>
        <Hero />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Poppins, Arial, sans-serif",
              fontWeight: 600,
              textAlign: "center",
              mb: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <RestaurantIcon color="primary" />
            Popular Restaurants
          </Typography>
          <Grid container spacing={3}>
            {Array.from(new Array(8)).map((_, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <RestaurantCardSkeleton />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    );
  }

  // Error State
  if (error) {
    return (
      <Box>
        <Hero />
        <Container maxWidth="sm" sx={{ py: 6 }}>
          <Paper
            sx={{
              p: 4,
              textAlign: "center",
              borderRadius: 3,
              bgcolor: "error.light",
              color: "error.contrastText",
            }}
          >
            <ErrorIcon sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Oops! Something went wrong
            </Typography>
            <Typography variant="body1">
              We couldn't load the restaurants right now. Please try again later.
            </Typography>
          </Paper>
        </Container>
      </Box>
    );
  }

  // Empty State
  if (restaurants.length === 0) {
    return (
      <Box>
        <Hero />
        <Container maxWidth="sm" sx={{ py: 6 }}>
          <Box sx={{ textAlign: "center" }}>
            <RestaurantIcon sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />
            <Typography variant="h5" gutterBottom sx={{ fontFamily: "Poppins" }}>
              No restaurants available
            </Typography>
            <Typography color="text.secondary">
              Check back soon for delicious options!
            </Typography>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box>
      <Hero />
      
      {/* Restaurants Section */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Section Header */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "Poppins, Arial, sans-serif",
              fontWeight: 700,
              color: "text.primary",
              mb: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <RestaurantIcon color="primary" />
            Popular Restaurants
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              fontFamily: "Lato, Arial, sans-serif",
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            Discover authentic flavors from our partner restaurants
          </Typography>
        </Box>

        {/* Restaurant Grid */}
        <Grid container spacing={3} justifyContent="center">
          {restaurants.map((restaurant) => (
            <Grid item key={restaurant._id} xs={12} sm={6} md={4} lg={3}>
              <RestaurantCard restaurant={restaurant} />
            </Grid>
          ))}
        </Grid>

        {/* Bottom CTA or Stats */}
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <Stack 
            direction={{ xs: "column", sm: "row" }} 
            spacing={4} 
            justifyContent="center"
            alignItems="center"
          >
            <Box>
              <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
                {restaurants.length}+
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Restaurant Partners
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
                Fast
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Delivery Service
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
                Fresh
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Quality Food
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;