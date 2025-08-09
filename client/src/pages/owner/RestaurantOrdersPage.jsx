import { useParams } from "react-router-dom";
import {
  useGetRestaurantOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../store/apiSlice";
import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
} from "@mui/material";

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
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  if (isLoading) return <CircularProgress />;
  if (error)
    return <Typography color="error">Failed to load orders.</Typography>;

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Manage Orders
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id.substring(0, 8)}</TableCell>
                <TableCell>{order.customer.name}</TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>₹{order.totalPrice.toFixed(2)}</TableCell>
                <TableCell>
                  <Select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    disabled={isUpdating}
                    size="small"
                  >
                    <MenuItem value="Placed">Placed</MenuItem>
                    <MenuItem value="Preparing">Preparing</MenuItem>
                    <MenuItem value="Out for Delivery">
                      Out for Delivery
                    </MenuItem>
                    <MenuItem value="Delivered">Delivered</MenuItem>
                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RestaurantOrdersPage;
