import { Box, Card, Skeleton, Stack } from "@mui/material";

const RestaurantCardSkeleton = () => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: 2,
        "&:hover": {
          boxShadow: 4,
        },
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* Image Skeleton */}
      <Skeleton 
        variant="rectangular" 
        width="100%" 
        height={160}
        animation="wave"
        sx={{ 
          bgcolor: "grey.100",
        }}
      />
      
      {/* Content Skeleton */}
      <Box sx={{ p: 2.5 }}>
        {/* Restaurant Name */}
        <Skeleton 
          variant="text" 
          width="75%" 
          height={28}
          animation="wave"
          sx={{ 
            mb: 1,
            borderRadius: 1,
          }}
        />
        
        {/* Info Row */}
        <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
          <Skeleton 
            variant="text" 
            width="30%" 
            height={20}
            animation="wave"
            sx={{ borderRadius: 1 }}
          />
          <Skeleton 
            variant="text" 
            width="25%" 
            height={20}
            animation="wave"
            sx={{ borderRadius: 1 }}
          />
        </Stack>
        
        {/* Description */}
        <Skeleton 
          variant="text" 
          width="90%" 
          height={18}
          animation="wave"
          sx={{ 
            mb: 0.5,
            borderRadius: 1,
          }}
        />
        <Skeleton 
          variant="text" 
          width="60%" 
          height={18}
          animation="wave"
          sx={{ borderRadius: 1 }}
        />
      </Box>
    </Card>
  );
};

export default RestaurantCardSkeleton;