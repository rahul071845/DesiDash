import Hero from "../components/home/Hero.jsx";
import RestaurantCard from "../components/restaurants/RestaurantCard.jsx";
import RestaurantCardSkeleton from "../components/restaurants/RestaurantCardSkeleton.jsx";
import { useGetRestaurantsQuery } from "../store/apiSlice.js";
import { Box, Typography, Grid } from "@mui/material";

const HomePage = () => {
  const { data: restaurants = [], isLoading, error } = useGetRestaurantsQuery();
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {Array.from(new Array(8)).map((_, index) => (
          <RestaurantCardSkeleton key={index} />
        ))}
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center">
        Error fetching restaurants. Please try again later.
      </Typography>
    );
  }
  return (
    <Box>
      <Hero />
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        sx={{ mt: 4 }}
      >
        Our Restaurants
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {restaurants.map((restaurant) => (
          <Grid item key={restaurant._id} xs={12} sm={6} md={4} lg={3}>
            <RestaurantCard restaurant={restaurant} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
