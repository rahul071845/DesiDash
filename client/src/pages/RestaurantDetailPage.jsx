import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetRestaurantQuery } from "../store/apiSlice.js";
import { addToCart } from "../store/cartSlice.js";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import {
  Restaurant as RestaurantIcon,
  MenuBook as MenuIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { toast } from "react-hot-toast";

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
    toast.success(`${menuItem.name} added to cart!`);
  };

  if (isLoading) {
    return (
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
          }}
        >
          <CircularProgress size={50} color="primary" />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Box sx={{ textAlign: "center", py: 8 }}>
          <RestaurantIcon sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />
          <Typography variant="h5" color="error" gutterBottom>
            Oops! Something went wrong
          </Typography>
          <Typography color="text.secondary">
            Could not load restaurant details. Please try again later.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 3 }}>
        {/* Restaurant Header */}
        <Card sx={{ mb: 4, borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  bgcolor: "primary.main",
                  fontSize: "1.5rem",
                }}
              >
                <RestaurantIcon />
              </Avatar>
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: "Poppins, Arial, sans-serif",
                    fontWeight: 700,
                    color: "text.primary",
                    mb: 0.5,
                  }}
                >
                  {restaurant.name}
                </Typography>
                <Typography color="text.secondary">
                  Authentic flavors, delivered fresh
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Menu Section */}
        <Typography
          variant="h5"
          sx={{
            fontFamily: "Poppins, Arial, sans-serif",
            fontWeight: 600,
            mb: 3,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <MenuIcon color="primary" />
          Our Menu
        </Typography>

        {/* Menu Items Grid */}
        <Grid container spacing={3}>
          {restaurant.menu.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  boxShadow: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  {/* Item Image Placeholder */}
                  {item.imageUrl ? (
                    <Avatar
                      src={item.imageUrl}
                      alt={item.name}
                      sx={{
                        width: "100%",
                        height: 120,
                        borderRadius: 2,
                        mb: 2,
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: "100%",
                        height: 120,
                        bgcolor: "background.default",
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 2,
                      }}
                    >
                      <RestaurantIcon
                        sx={{ fontSize: 40, color: "text.secondary" }}
                      />
                    </Box>
                  )}

                  {/* Item Details */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      height: "40px",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {item.description}
                  </Typography>

                  {/* Price and Add Button */}
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mt: "auto" }}
                  >
                    <Typography
                      variant="h6"
                      color="primary.main"
                      sx={{ fontWeight: 700 }}
                    >
                      ₹{item.price}
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<AddIcon />}
                      onClick={() => addToCartHandler(item)}
                      sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600,
                        px: 2,
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                        transition: "all 0.2s ease",
                      }}
                    >
                      Add
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Empty Menu State */}
        {restaurant.menu.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <MenuIcon sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              No menu items available
            </Typography>
            <Typography color="text.secondary">
              This restaurant hasn't added any menu items yet.
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default RestaurantDetailPage;