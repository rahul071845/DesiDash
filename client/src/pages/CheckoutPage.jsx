import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../store/apiSlice.js";
import { clearCart } from "../store/cartSlice.js";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Receipt as ReceiptIcon,
  ShoppingBag as ShoppingBagIcon,
} from "@mui/icons-material";
import { toast } from "react-hot-toast";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { restaurants, totalPrice } = useSelector((state) => state.cart);

  const cartItems = Object.values(restaurants).flatMap(
    (restaurant) => restaurant.items
  );

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const placeOrderHandler = async () => {
    try {
      const orderPromises = Object.keys(restaurants).map((restaurantId) => {
        const orderItems = restaurants[restaurantId].items.map((item) => ({
          menuItem: item._id,
          qty: item.qty,
        }));
        return createOrder({ orderItems, restaurantId }).unwrap();
      });
      await Promise.all(orderPromises);
      dispatch(clearCart());
      toast.success("Order placed successfully!");
      navigate("/order-success");
    } catch (err) {
      console.error("Failed to place all orders:", err);
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Poppins, Arial, sans-serif",
            fontWeight: 700,
            color: "text.primary",
            mb: 3,
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <ReceiptIcon color="primary" />
          Order Summary
        </Typography>

        <Stack spacing={3}>
          {/* Delivery Information */}
          <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <ShoppingBagIcon color="primary" fontSize="small" />
                Delivery Details
              </Typography>
              <Stack spacing={1}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PersonIcon fontSize="small" color="action" />
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {userInfo.user.name}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <EmailIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {userInfo.user.email}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <ReceiptIcon color="primary" fontSize="small" />
                Your Order
              </Typography>
              <Stack spacing={1.5}>
                {cartItems.map((item) => (
                  <Box
                    key={item._id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      p: 2,
                      bgcolor: "background.default",
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Qty: {item.qty} × ₹{item.price.toFixed(2)}
                      </Typography>
                    </Box>
                    <Typography
                      variant="h6"
                      color="primary.main"
                      sx={{ fontWeight: 600 }}
                    >
                      ₹{(item.qty * item.price).toFixed(2)}
                    </Typography>
                  </Box>
                ))}
              </Stack>

              <Divider sx={{ my: 3 }} />

              {/* Total */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 2,
                  bgcolor: "primary.light",
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "primary.contrastText" }}
                >
                  Total Amount
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, color: "primary.contrastText" }}
                >
                  ₹{totalPrice.toFixed(2)}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Place Order Button */}
          <Button
            fullWidth
            variant="contained"
            size="large"
            disabled={cartItems.length === 0 || isLoading}
            onClick={placeOrderHandler}
            startIcon={
              isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <ShoppingBagIcon />
              )
            }
            sx={{
              py: 2,
              borderRadius: 3,
              textTransform: "none",
              fontSize: "1.2rem",
              fontWeight: 600,
              fontFamily: "Lato, Arial, sans-serif",
              "&:hover": {
                transform: "translateY(-1px)",
                boxShadow: "0 6px 16px rgba(230, 126, 34, 0.3)",
              },
              "&:disabled": {
                bgcolor: "action.disabledBackground",
                color: "action.disabled",
              },
              transition: "all 0.3s ease",
            }}
          >
            {isLoading ? "Placing Order..." : "Place Order"}
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default CheckoutPage;