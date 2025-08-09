import { Link as RouterLink } from "react-router-dom";
import { useGetMyRestaurantsQuery } from "../../store/apiSlice";
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

const OwnerDashboardPage = () => {
  const {
    data: restaurants = [],
    isLoading,
    error,
  } = useGetMyRestaurantsQuery();
  if (isLoading) return <CircularProgress />;
  if (error)
    return <Typography color="error">Failed to load restaurants.</Typography>;
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        My Restaurants
      </Typography>
      {restaurants.length === 0 ? (
        <Typography>You have not created any restaurants yet.</Typography>
      ) : (
        <List>
          {restaurants.map((restaurant) => (
            <ListItem key={restaurant._id} disablePadding>
              <ListItemButton
                component={RouterLink}
                to={`/dashboard/restaurant/${restaurant._id}/orders`}
              >
                <ListItemText
                  primary={restaurant.name}
                  secondary={restaurant.address}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default OwnerDashboardPage;
