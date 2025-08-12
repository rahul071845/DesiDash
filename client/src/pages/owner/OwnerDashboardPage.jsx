import { Link as RouterLink } from "react-router-dom";
import { useGetMyRestaurantsQuery } from "../../store/apiSlice";
import {
  Box,
  Button,
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
  Add as AddIcon,
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
        {/* Header with Action Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: "Poppins, Arial, sans-serif",
              fontWeight: 700,
              color: "text.primary",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <RestaurantIcon color="primary" />
            My Restaurants
          </Typography>

          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/create-restaurant"
            startIcon={<AddIcon />}
            sx={{
              borderRadius: 2,
              px: 3,
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                transform: "translateY(-1px)",
                boxShadow: "0 4px 12px rgba(230, 126, 34, 0.3)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Add Restaurant
          </Button>
        </Box>

        {/* Empty State */}
        {restaurants.length === 0 ? (
          <Card sx={{ borderRadius: 3, boxShadow: 3, mt: 2 }}>
            <CardContent>
              <Box sx={{ textAlign: "center", py: 6 }}>
                <StorefrontIcon
                  sx={{ fontSize: 80, color: "text.secondary", mb: 2 }}
                />
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ 
                    fontFamily: "Poppins, Arial, sans-serif", 
                    fontWeight: 600,
                    mb: 2,
                  }}
                >
                  No Restaurants Yet
                </Typography>
                <Typography 
                  color="text.secondary" 
                  sx={{ mb: 3, maxWidth: "400px", mx: "auto" }}
                >
                  You haven't created any restaurants yet. Get started by adding your first restaurant to begin managing orders.
                </Typography>
                <Button
                  variant="outlined"
                  component={RouterLink}
                  to="/dashboard/create-restaurant"
                  startIcon={<AddIcon />}
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Create Your First Restaurant
                </Button>
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
                  border: "1px solid",
                  borderColor: "divider",
                  "&:hover": {
                    boxShadow: 4,
                    borderColor: "primary.main",
                    transform: "translateY(-2px)",
                    "& .arrow-icon": {
                      transform: "translateX(4px)",
                      color: "primary.dark",
                    },
                    "& .restaurant-name": {
                      color: "primary.main",
                    },
                  },
                }}
              >
                <CardContent sx={{ py: 2 }}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography
                        className="restaurant-name"
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: "text.primary",
                          mb: 1,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          transition: "color 0.3s ease",
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
                        transition: "all 0.3s ease",
                        fontSize: "1.2rem",
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