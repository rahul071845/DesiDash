import { Box, Card, CardContent, Chip, Divider, Stack, Typography } from "@mui/material";
import { Restaurant as RestaurantIcon, AccessTime as TimeIcon } from "@mui/icons-material";

const OrderItemCard = ({ order, getStatusColor }) => {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
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
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
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
                  {order.restaurant?.name || "Restaurant"}
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
  );
};

export default OrderItemCard;
