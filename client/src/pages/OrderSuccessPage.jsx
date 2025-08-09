import { Box, Button, Paper, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const OrderSuccessPage = () => {
  return (
    <Paper sx={{ p: 4, maxWidth: 600, margin: "auto", textAlign: "center" }}>
      <CheckCircleOutlineIcon sx={{ fontSize: 80, color: "success.main" }} />
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 2 }}>
        Order Successful!
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Thank you for your order. You will receive an email confirmation
        shortly.
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/profile"
        >
          View My Orders
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          component={RouterLink}
          to="/"
        >
          Continue Shopping
        </Button>
      </Box>
    </Paper>
  );
};

export default OrderSuccessPage;
