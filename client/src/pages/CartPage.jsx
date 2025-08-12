import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ShoppingCartOutlined as CartIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";
import {
  removeFromCart,
  decreaseItemQuantity,
  addToCart,
  clearCart,
} from "../store/cartSlice.js";
import EmptyState from "../components/common/EmptyState.jsx";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { restaurants, totalPrice } = useSelector((state) => state.cart);

  const allCartItems = Object.keys(restaurants).flatMap((restaurantId) =>
    restaurants[restaurantId].items.map((item) => ({
      ...item,
      restaurantId: restaurantId,
      restaurantName: restaurants[restaurantId].restaurantName,
    }))
  );

  const checkoutHandler = () => {
    navigate("/checkout");
  };

  // Empty cart state
  if (Object.keys(restaurants).length === 0) {
    return (
      <EmptyState
        icon={<CartIcon sx={{ fontSize: "inherit" }} />}
        title="Your cart is empty"
        message="Add some delicious items to get started!"
        actionText="Browse Restaurants"
        actionTo="/"
      />
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 3 }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
            <CartIcon color="primary" />
            Your Cart
          </Typography>
          <Button sx={{ mb: 3, fontWeight: 600 }} onClick={() => dispatch(clearCart())}>Clear Cart</Button>
        </Box>

        {/* Cart Items */}
        <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 3 }}>
          <CardContent sx={{ p: 0 }}>
            {allCartItems.map((item, index) => (
              <Box key={item._id}>
                <Box sx={{ p: 2 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    {/* Item Image */}
                    <Avatar
                      src={item.imageUrl}
                      alt={item.name}
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 2,
                        border: "2px solid",
                        borderColor: "divider",
                      }}
                    />

                    {/* Item Details */}
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          fontSize: "1rem",
                          mb: 0.5,
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        From: {item.restaurantName}
                      </Typography>
                      <Typography
                        variant="h6"
                        color="primary.main"
                        sx={{ fontWeight: 600 }}
                      >
                        ₹{(item.price * item.qty).toFixed(2)}
                      </Typography>
                    </Box>

                    {/* Quantity Controls */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        bgcolor: "background.default",
                        borderRadius: 2,
                        border: "1px solid",
                        borderColor: "divider",
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() =>
                          dispatch(
                            decreaseItemQuantity({
                              menuItem: item,
                              restaurantId: item.restaurantId,
                            })
                          )
                        }
                        sx={{
                          color: "primary.main",
                          "&:hover": { bgcolor: "primary.light" },
                        }}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography
                        sx={{
                          px: 2,
                          fontWeight: 600,
                          minWidth: "40px",
                          textAlign: "center",
                        }}
                      >
                        {item.qty}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() =>
                          dispatch(
                            addToCart({
                              menuItem: item,
                              restaurantId: item.restaurantId,
                            })
                          )
                        }
                        sx={{
                          color: "primary.main",
                          "&:hover": { bgcolor: "primary.light" },
                        }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>

                    {/* Delete Button */}
                    <IconButton
                      onClick={() =>
                        dispatch(
                          removeFromCart({
                            menuItem: item,
                            restaurantId: item.restaurantId,
                          })
                        )
                      }
                      sx={{
                        color: "error.main",
                        "&:hover": { bgcolor: "error.light" },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </Box>
                {index < allCartItems.length - 1 && <Divider />}
              </Box>
            ))}
          </CardContent>
        </Card>

        {/* Cart Summary */}
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Stack spacing={2}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Total
                </Typography>
                <Typography
                  variant="h4"
                  color="primary.main"
                  sx={{ fontWeight: 700 }}
                >
                  ₹{totalPrice.toFixed(2)}
                </Typography>
              </Box>

              <Button
                variant="contained"
                size="large"
                onClick={checkoutHandler}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  textTransform: "none",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  "&:hover": {
                    transform: "translateY(-1px)",
                    boxShadow: "0 4px 12px rgba(230, 126, 34, 0.3)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Proceed to Checkout
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default CartPage;
