import { Box, Card, Skeleton } from "@mui/material";

const RestaurantCardSkeleton = () => {
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <Skeleton variant="rectangular" width={345} height={140} />
      <Box sx={{ p: 2 }}>
        <Skeleton variant="text" width="80%" height={32} />
        <Skeleton variant="text" width="40%" />
      </Box>
    </Card>
  );
};

export default RestaurantCardSkeleton;
