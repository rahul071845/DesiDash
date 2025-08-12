import { Link as RouterLink } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Stack,
} from "@mui/material";
import {
  Restaurant as RestaurantIcon,
  LocationOn as LocationIcon,
  Star as StarIcon,
} from "@mui/icons-material";

const RestaurantCard = ({ restaurant }) => {
  // Generate a random rating for demo (you can replace with actual rating from your data)
  const rating = restaurant.rating || (Math.random() * 2 + 3).toFixed(1);

  return (
    <Card
      sx={{
        height: "100%",
        maxWidth: "250px",
        borderRadius: 3,
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 25px rgba(230, 126, 34, 0.15)",
        },
      }}
    >
      <CardActionArea
        component={RouterLink}
        to={`/restaurant/${restaurant._id}`}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        {/* Image with overlay */}
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            image={
              restaurant.imageUrl ||
              "https://via.placeholder.com/345x160?text=Restaurant+Image"
            }
            alt={restaurant.name}
            sx={{
              height: "200px",
              objectFit: "cover",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          />

          {/* Rating overlay */}
          <Box
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              bgcolor: "rgba(255, 255, 255, 0.95)",
              borderRadius: 2,
              px: 1,
              py: 0.5,
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              backdropFilter: "blur(4px)",
            }}
          >
            <StarIcon sx={{ fontSize: 16, color: "#FFD700" }} />
            <Typography
              variant="caption"
              sx={{ fontWeight: 600, color: "text.primary" }}
            >
              {rating}
            </Typography>
          </Box>
        </Box>

        <CardContent sx={{ flexGrow: 1, p: 2 }}>
          {/* Restaurant name */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontFamily: "Poppins, Arial, sans-serif",
              fontWeight: 600,
              mb: 1,
              lineHeight: 1.2,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {restaurant.name}
          </Typography>

          {/* Cuisine chip */}
          <Chip
            icon={<RestaurantIcon sx={{ fontSize: "16px !important" }} />}
            label={restaurant.cuisine}
            size="small"
            sx={{
              bgcolor: "primary.light",
              color: "primary.contrastText",
              fontWeight: 500,
              mb: 1.5,
              height: 24,
              "& .MuiChip-label": {
                px: 1,
                fontSize: "0.75rem",
              },
            }}
          />

          {/* Address */}
          <Stack direction="row" alignItems="flex-start" spacing={0.5}>
            <LocationIcon
              sx={{
                fontSize: 16,
                color: "text.secondary",
                mt: 0.1,
                flexShrink: 0,
              }}
            />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                lineHeight: 1.4,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {restaurant.address}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RestaurantCard;
