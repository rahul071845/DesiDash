import { Box, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { Receipt as ReceiptIcon } from "@mui/icons-material";
import EmptyState from "../common/EmptyState.jsx";
import OrderItemCard from "./OrderItemCard.jsx";

const OrderHistory = ({ orders, isLoading, error, getStatusColor }) => {
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
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
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <EmptyState
        icon={<ReceiptIcon sx={{ fontSize: "inherit" }} />}
        title="No Orders Yet"
        message="It looks like you haven't placed any orders with us yet."
        actionText="Browse Restaurants"
        actionTo="/"
      />
    );
  }

  return (
    <Stack spacing={2}>
      {orders.map((order) => (
        <OrderItemCard
          key={order._id}
          order={order}
          getStatusColor={getStatusColor}
        />
      ))}
    </Stack>
  );
};

export default OrderHistory;
