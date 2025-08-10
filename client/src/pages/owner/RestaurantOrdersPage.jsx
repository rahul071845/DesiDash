import { useParams } from "react-router-dom";
import {
  useGetRestaurantOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../store/apiSlice";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Container,
  Stack,
  Select,
  MenuItem,
  Chip,
  Avatar,
  Paper,
  Alert,
} from "@mui/material";
import {
  RestaurantMenu as RestaurantIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  LocalDining as DiningIcon,
} from "@mui/icons-material";
import { toast } from "react-hot-toast";

const RestaurantOrdersPage = () => {
  const { id: restaurantId } = useParams();
  const {
    data: orders = [],
    isLoading,
    error,
  } = useGetRestaurantOrdersQuery(restaurantId);
  const [updateOrderStatus, { isLoading: isUpdating }] =
    useUpdateOrderStatusMutation();

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus({ orderId, status: newStatus }).unwrap();
      toast.success("Order status updated successfully!");
    } catch (err) {
      console.error("Failed to update status:", err);
      toast.error("Failed to update order status");
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "success";
      case "preparing":
        return "warning";
      case "out for delivery":
        return "info";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress color="primary" size={50} />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Alert severity="error" sx={{ borderRadius: 2 }}>
            Failed to load orders. Please try again later.
          </Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
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
          Manage Orders
        </Typography>

        {/* Orders List */}
        {orders.length === 0 ? (
          <Paper
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: 3,
              bgcolor: "background.default",
            }}
          >
            <DiningIcon sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No orders found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Orders will appear here once customers start ordering
            </Typography>
          </Paper>
        ) : (
          <Stack spacing={2}>
            {orders.map((order) => (
              <Card key={order._id} sx={{ borderRadius: 3, boxShadow: 2 }}>
                <CardContent>
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={3}
                    alignItems={{ xs: "flex-start", md: "center" }}
                  >
                    {/* Order Info */}
                    <Box sx={{ flexGrow: 1 }}>
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={2}
                        alignItems={{ xs: "flex-start", sm: "center" }}
                        sx={{ mb: 1 }}
                      >
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 600, color: "primary.main" }}
                        >
                          #{order._id.substring(0, 8).toUpperCase()}
                        </Typography>
                        <Chip
                          label={order.status}
                          color={getStatusColor(order.status)}
                          size="small"
                          sx={{ fontWeight: 600 }}
                        />
                      </Stack>

                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={3}
                        sx={{ mb: 1 }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Avatar
                            sx={{
                              width: 24,
                              height: 24,
                              bgcolor: "secondary.main",
                              fontSize: "0.75rem",
                            }}
                          >
                            {order.customer.name.charAt(0).toUpperCase()}
                          </Avatar>
                          <Typography variant="body2" color="text.secondary">
                            {order.customer.name}
                          </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <CalendarIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </Typography>
                        </Box>

                        <Typography
                          variant="body1"
                          sx={{ fontWeight: 600, color: "primary.main" }}
                        >
                          ₹{order.totalPrice.toFixed(2)}
                        </Typography>
                      </Stack>

                      {/* Order Items Preview */}
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: "0.875rem" }}
                      >
                        {order.orderItems.length} item
                        {order.orderItems.length !== 1 ? "s" : ""} •{" "}
                        {order.orderItems
                          .slice(0, 2)
                          .map((item) => item.name)
                          .join(", ")}
                        {order.orderItems.length > 2 && "..."}
                      </Typography>
                    </Box>

                    {/* Status Selector */}
                    <Box sx={{ minWidth: 160 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1, fontSize: "0.75rem", fontWeight: 600 }}
                      >
                        UPDATE STATUS
                      </Typography>
                      <Select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        disabled={isUpdating}
                        size="small"
                        fullWidth
                        sx={{
                          borderRadius: 2,
                          "& .MuiSelect-select": {
                            py: 1,
                          },
                        }}
                      >
                        <MenuItem value="Placed">Placed</MenuItem>
                        <MenuItem value="Preparing">Preparing</MenuItem>
                        <MenuItem value="Out for Delivery">
                          Out for Delivery
                        </MenuItem>
                        <MenuItem value="Delivered">Delivered</MenuItem>
                        <MenuItem value="Cancelled">Cancelled</MenuItem>
                      </Select>
                    </Box>
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

export default RestaurantOrdersPage;