import { useSelector } from "react-redux";
import { useGetMyOrdersQuery } from "../store/apiSlice.js";
import EmptyState from "../components/common/EmptyState.jsx";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Receipt as ReceiptIcon,
  Restaurant as RestaurantIcon,
  AccessTime as TimeIcon,
} from "@mui/icons-material";

const ProfilePage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "success";
      case "preparing":
        return "warning";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 3 }}>
        {/* Profile Header */}
        <Card sx={{ mb: 4, borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Stack direction="row" spacing={3} alignItems="center">
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: "primary.main",
                  fontSize: "2rem",
                  fontWeight: 700,
                }}
              >
                {userInfo.user.name.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: "Poppins, Arial, sans-serif",
                    fontWeight: 700,
                    color: "text.primary",
                    mb: 1,
                  }}
                >
                  Welcome back, {userInfo.user.name.split(" ")[0]}!
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <PersonIcon color="primary" fontSize="small" />
                    <Typography color="text.secondary">
                      {userInfo.user.name}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <EmailIcon color="primary" fontSize="small" />
                    <Typography color="text.secondary">
                      {userInfo.user.email}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Orders Section */}
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
          <ReceiptIcon color="primary" />
          Order History
        </Typography>

        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : error ? (
          <Paper
            sx={{
              p: 3,
              textAlign: "center",
              borderRadius: 3,
              bgcolor: "error.light",
              color: "error.contrastText",
            }}
          >
            <Typography>Could not load orders. Please try again later.</Typography>
          </Paper>
        ) : orders?.length === 0 ? (
          <EmptyState
            icon={<ReceiptIcon sx={{ fontSize: "inherit" }} />}
            title="No Orders Yet"
            message="It looks like you haven't placed any orders with us yet."
            actionText="Browse Restaurants"
            actionTo="/"
          />
        ) : (
          <Stack spacing={2}>
            {orders?.map((order) => (
              <Card key={order._id} sx={{ borderRadius: 3, boxShadow: 2 }}>
                <CardContent>
                  {/* Order Header */}
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    spacing={2}
                    sx={{ mb: 2 }}
                  >
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, mb: 0.5 }}
                      >
                        Order #{order._id.substring(0, 8).toUpperCase()}
                      </Typography>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          <TimeIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          <RestaurantIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            {order.restaurant.name}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>

                    <Stack direction="row" spacing={2} alignItems="center">
                      <Chip
                        label={order.status?.toUpperCase() || "PENDING"}
                        color={getStatusColor(order.status)}
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                      <Typography
                        variant="h6"
                        color="primary.main"
                        sx={{ fontWeight: 700 }}
                      >
                        ₹{order.totalPrice.toFixed(2)}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Divider sx={{ my: 2 }} />

                  {/* Order Items */}
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ mb: 1, fontWeight: 600 }}
                  >
                    Items Ordered:
                  </Typography>
                  <Stack spacing={1}>
                    {order.orderItems.map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          py: 0.5,
                          px: 2,
                          bgcolor: "background.default",
                          borderRadius: 1,
                        }}
                      >
                        <Typography variant="body2">
                          <strong>{item.qty}x</strong> {item.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontWeight: 500 }}
                        >
                          ₹{(item.price * item.qty).toFixed(2)}
                        </Typography>
                      </Box>
                    ))}
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

export default ProfilePage;