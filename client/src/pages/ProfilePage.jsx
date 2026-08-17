import { useSelector } from "react-redux";
import { useGetMyOrdersQuery } from "../store/apiSlice.js";
import { useEffect } from "react";
import io from "socket.io-client";
import { toast } from "react-hot-toast";
import { Box, Container, Typography } from "@mui/material";
import { Receipt as ReceiptIcon } from "@mui/icons-material";
import ProfileHeader from "../components/profile/ProfileHeader.jsx";
import OrderHistory from "../components/profile/OrderHistory.jsx";

const socket = io(import.meta.env.VITE_BACKEND_URL);

const ProfilePage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: orders, isLoading, error, refetch } = useGetMyOrdersQuery();

  useEffect(() => {
    if (userInfo && userInfo.user) {
      // Join customer's personal room
      socket.emit("joinRoom", userInfo.user._id);

      // Listen for order status updates
      socket.on("order_status_updated", (updatedOrder) => {
        toast.success(`Order status updated to: ${updatedOrder.status}`, {
          icon: "🍕",
        });
        refetch(); // Instantly update cache
      });
    }
    return () => {
      socket.off("order_status_updated");
    };
  }, [userInfo, refetch]);

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
        {/* Modular Profile Header */}
        <ProfileHeader userInfo={userInfo} />

        {/* Orders Section Heading */}
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

        {/* Modular Order History Content */}
        <OrderHistory
          orders={orders}
          isLoading={isLoading}
          error={error}
          getStatusColor={getStatusColor}
        />
      </Box>
    </Container>
  );
};

export default ProfilePage;