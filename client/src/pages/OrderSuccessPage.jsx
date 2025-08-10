import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import {
  CheckCircle as CheckCircleIcon,
  Receipt as ReceiptIcon,
  Home as HomeIcon,
  Celebration as CelebrationIcon,
} from "@mui/icons-material";

const OrderSuccessPage = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
        }}
      >
        <Card
          sx={{
            borderRadius: 4,
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            width: "100%",
            position: "relative",
            overflow: "visible",
          }}
        >
          <CardContent sx={{ p: 4, textAlign: "center" }}>
            {/* Success Icon with Animation */}
            <Box
              sx={{
                position: "relative",
                display: "inline-flex",
                mb: 3,
              }}
            >
              <CheckCircleIcon
                sx={{
                  fontSize: 100,
                  color: "success.main",
                  filter: "drop-shadow(0 4px 8px rgba(76, 175, 80, 0.3))",
                }}
              />
              <CelebrationIcon
                sx={{
                  position: "absolute",
                  top: -10,
                  right: -10,
                  fontSize: 40,
                  color: "primary.main",
                  animation: "bounce 2s infinite",
                  "@keyframes bounce": {
                    "0%, 20%, 50%, 80%, 100%": {
                      transform: "translateY(0)",
                    },
                    "40%": {
                      transform: "translateY(-10px)",
                    },
                    "60%": {
                      transform: "translateY(-5px)",
                    },
                  },
                }}
              />
            </Box>

            {/* Success Message */}
            <Typography
              variant="h3"
              sx={{
                fontFamily: "Poppins, Arial, sans-serif",
                fontWeight: 700,
                color: "success.main",
                mb: 2,
                fontSize: { xs: "2rem", sm: "2.5rem" },
              }}
            >
              Order Placed Successfully!
            </Typography>

            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                mb: 1,
                fontWeight: 500,
              }}
            >
              🎉 Thank you for choosing DesiDash!
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mb: 4,
                lineHeight: 1.6,
                maxWidth: "400px",
                mx: "auto",
              }}
            >
              Your delicious meal is being prepared with love. You'll receive an
              email confirmation and tracking updates shortly.
            </Typography>

            {/* Action Buttons */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                size="large"
                component={RouterLink}
                to="/profile"
                startIcon={<ReceiptIcon />}
                sx={{
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  textTransform: "none",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  bgcolor: "success.main",
                  "&:hover": {
                    bgcolor: "success.dark",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px rgba(76, 175, 80, 0.4)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Track My Order
              </Button>

              <Button
                variant="outlined"
                size="large"
                component={RouterLink}
                to="/"
                startIcon={<HomeIcon />}
                sx={{
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  textTransform: "none",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  borderColor: "primary.main",
                  color: "primary.main",
                  "&:hover": {
                    bgcolor: "primary.light",
                    borderColor: "primary.main",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px rgba(230, 126, 34, 0.3)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Order More Food
              </Button>
            </Box>

            {/* Additional Info */}
            <Box
              sx={{
                mt: 4,
                pt: 3,
                borderTop: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontStyle: "italic",
                }}
              >
                Need help? Contact our support team anytime!
              </Typography>
            </Box>
          </CardContent>

          {/* Decorative Background Elements */}
          <Box
            sx={{
              position: "absolute",
              top: -20,
              right: -20,
              width: 60,
              height: 60,
              borderRadius: "50%",
              bgcolor: "success.light",
              opacity: 0.1,
              zIndex: -1,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: -30,
              left: -30,
              width: 80,
              height: 80,
              borderRadius: "50%",
              bgcolor: "primary.light",
              opacity: 0.1,
              zIndex: -1,
            }}
          />
        </Card>
      </Box>
    </Container>
  );
};

export default OrderSuccessPage;
