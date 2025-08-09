import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetRestaurantQuery } from "../store/apiSlice.js";
import { addToCart } from "../store/cartSlice.js";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
} from "@mui/material";

const RestaurantDetailPage = () => {
  const { id: restaurantId } = useParams();
  const dispatch = useDispatch();

  const {
    data: restaurant,
    isLoading,
    error,
  } = useGetRestaurantQuery(restaurantId);

  const addToCartHandler = (menuItem) => {
    dispatch(
      addToCart({
        menuItem,
        restaurantId: restaurant._id,
        restaurantName: restaurant.name,
      })
    );
  };

  if (isLoading) return <CircularProgress />;
  if (error)
    return (
      <Typography color="error">Error loading restaurant details.</Typography>
    );
  return (
    <Box>
      <Typography variant="h3" component="h1">
        {restaurant.name}
      </Typography>
      <Typography variant="h3" color="text.secondary">
        Menu
      </Typography>
      <List>
        {restaurant.menu.map((item) => (
          <Box key={item._id}>
            <ListItem
              secondaryAction={
                <Button
                  variant="contained"
                  onClick={() => addToCartHandler(item)}
                >
                  Add to cart
                </Button>
              }
            >
              <ListItemText
                primary={item.name}
                secondary={`₹${item.price} - ${item.description}`}
              />
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default RestaurantDetailPage;
