import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./components/common/Header.jsx";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import RestaurantDetailPage from "./pages/RestaurantDetailPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import ProtectedRoute from "./components/common/ProtectedRoute.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import OrderSuccessPage from "./pages/OrderSuccessPage.jsx";
import OwnerProtectedRoute from "./components/common/OwnerProtectedRoute.jsx";
import OwnerDashboardPage from "./pages/owner/OwnerDashboardPage.jsx";
import RestaurantOrdersPage from "./pages/owner/RestaurantOrdersPage.jsx";
import Footer from "./components/common/Footer.jsx";
import "./App.css";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Toaster position="top-center" reverseOrder={false} />
      <Box
        component="main"
        className="main"
        sx={{
          p: 3,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />                         {/*Done*/}
          <Route path="/register" element={<RegisterPage />} />                   {/*Done*/}
          <Route path="/restaurant/:id" element={<RestaurantDetailPage />} />
          <Route path="/cart" element={<CartPage />} />                           {/*Done*/}
          {/* Protected Routes */}
          <Route path="" element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />                   {/*Done*/}
            <Route path="/checkout" element={<CheckoutPage />} />                 {/*Done*/}
            <Route path="/order-success" element={<OrderSuccessPage />} />            
          </Route>
          {/* Restaurant Routes */}
          <Route path="" element={<OwnerProtectedRoute />}>
            <Route path="/dashboard" element={<OwnerDashboardPage />} />
            <Route
              path="/dashboard/restaurant/:id/orders"
              element={<RestaurantOrdersPage />}
            />
          </Route>
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
