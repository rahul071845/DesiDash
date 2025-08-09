import { Box, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const EmptyState = ({ icon, title, message, actionText, actionTo }) => {
  return (
    <Box textAlign="center" p={4}>
      <Box sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }}>{icon}</Box>
      <Typography variant="h5" gutterBottom>{title}</Typography>
      <Typography color="text.secondary">{message}</Typography>
      {actionText && actionTo && (
        <Button
          variant="contained"
          component={RouterLink}
          to={actionTo}
          sx={{ mt: 3 }}
        >
          {actionText}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;