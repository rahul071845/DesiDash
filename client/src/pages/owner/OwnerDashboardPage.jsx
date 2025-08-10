import { Link as RouterLink } from "react-router-dom";
import { useGetMyRestaurantsQuery } from "../../store/apiSlice";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  Restaurant as RestaurantIcon,
  StorefrontOutlined as StorefrontIcon,
  LocationOn as LocationIcon,
  ArrowForwardIos as ArrowIcon,
} from "@mui/icons-material";

const OwnerDashboardPage = () => {
  const {
    data: restaurants = [],
    isLoading,
    error,
  } = useGetMyRestaurantsQuery();

  if (isLoading) {
    return (
      <Container maxWidth="md">
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress color="primary" size={40} />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Paper
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: 3,
            bgcolor: "error.light",
            color: "error.contrastText",
            mt: 4,
          }}
        >
          <Typography variant="h6">Failed to load restaurants.</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Please try refreshing the page.
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 3 }}>
        {/* Header */}
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Poppins, Arial, sans-serif",
            fontWeight: 700,
            color: "text.primary",
            mb: 3,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <RestaurantIcon color="primary" />
          My Restaurants
        </Typography>

        {/* Empty State */}
        {restaurants.length === 0 ? (
          <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
            <CardContent>
              <Box sx={{ textAlign: "center", py: 4 }}>
                <StorefrontIcon
                  sx={{ fontSize: 80, color: "text.secondary", mb: 2 }}
                />
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontFamily: "Poppins", fontWeight: 600 }}
                >
                  No Restaurants Yet
                </Typography>
                <Typography color="text.secondary">
                  You haven't created any restaurants yet. Contact support to add your first restaurant.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ) : (
          /* Restaurant List */
          <Stack spacing={2}>
            {restaurants.map((restaurant) => (
              <Card
                key={restaurant._id}
                component={RouterLink}
                to={`/dashboard/restaurant/${restaurant._id}/orders`}
                sx={{
                  borderRadius: 3,
                  boxShadow: 2,
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: 6,
                    transform: "translateY(-2px)",
                    "& .arrow-icon": {
                      transform: "translateX(4px)",
                    },
                  },
                }}
              >
                <CardContent>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: "text.primary",
                          mb: 1,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <StorefrontIcon color="primary" fontSize="small" />
                        {restaurant.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <LocationIcon fontSize="small" />
                        {restaurant.address}
                      </Typography>
                    </Box>
                    
                    <ArrowIcon
                      className="arrow-icon"
                      sx={{
                        color: "primary.main",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Box>
    </Container>
  );
};

export default OwnerDashboardPage;