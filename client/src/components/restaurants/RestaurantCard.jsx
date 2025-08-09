// src/components/restaurants/RestaurantCard.jsx
import { Link as RouterLink } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Box } from '@mui/material';

const RestaurantCard = ({ restaurant }) => {
  return (
    <Card 
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <CardActionArea 
        component={RouterLink} 
        to={`/restaurant/${restaurant._id}`}
        sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start'
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={restaurant.imageUrl || 'https://via.placeholder.com/345x140'}
          alt={restaurant.name}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="div">
            {restaurant.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {restaurant.cuisine}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {restaurant.address}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RestaurantCard;