import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

const OwnerProtectedRoute = () => {
  const { userInfo, isLoading } = useSelector((state) => state.auth);
  console.log(userInfo)
  if (isLoading || userInfo === null) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (userInfo && userInfo.user.role === "restaurantOwner") return <Outlet />;
  else return <Navigate to="/login" replace />;
};

export default OwnerProtectedRoute;
