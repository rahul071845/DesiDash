import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetRestaurantQuery, useAddMenuItemMutation, useUpdateMenuItemMutation, useDeleteMenuItemMutation } from '../../store/apiSlice';
import { toast } from 'react-hot-toast';
import { 
  Avatar,
  Box, 
  Button, 
  Card,
  CardContent,
  CircularProgress, 
  Container,
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  IconButton,
  Stack,
  TextField, 
  Typography 
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Restaurant as RestaurantIcon,
  MenuBook as MenuIcon,
} from '@mui/icons-material';

const ManageMenuPage = () => {
  const { id: restaurantId } = useParams();

  // Data Fetching Hooks
  const { data: restaurant, isLoading, error } = useGetRestaurantQuery(restaurantId);
  
  // Mutation Hooks
  const [addMenuItem, { isLoading: isAdding }] = useAddMenuItemMutation();
  const [updateMenuItem, { isLoading: isUpdating }] = useUpdateMenuItemMutation();
  const [deleteMenuItem] = useDeleteMenuItemMutation();

  // State for the Add/Edit Modal
  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  
  // State for the Form Fields
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // --- Event Handlers ---
  const handleOpenAddModal = () => {
    setIsEditMode(false);
    setCurrentItem(null);
    setName('');
    setDescription('');
    setPrice('');
    setImageUrl('');
    setOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setIsEditMode(true);
    setCurrentItem(item);
    setName(item.name);
    setDescription(item.description);
    setPrice(item.price);
    setImageUrl(item.imageUrl || '');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteMenuItem(itemId).unwrap();
        toast.success('Item deleted!');
      } catch (err) {
        toast.error('Failed to delete item.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const menuItemData = { name, description, price: Number(price), imageUrl };
    
    try {
      if (isEditMode) {
        await updateMenuItem({ menuItemId: currentItem._id, data: menuItemData }).unwrap();
        toast.success('Item updated!');
      } else {
        await addMenuItem({ restaurantId, data: menuItemData }).unwrap();
        toast.success('Item added!');
      }
      handleClose();
    } catch (err) {
      toast.error('An error occurred.');
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Card sx={{ mt: 4, p: 3, textAlign: 'center', borderRadius: 3 }}>
          <Typography color="error" variant="h6">
            Failed to load menu. Please try again.
          </Typography>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 3 }}>
        {/* Header */}
        <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <RestaurantIcon color="primary" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "Poppins, Arial, sans-serif",
                      fontWeight: 700,
                      color: "text.primary",
                    }}
                  >
                    Manage Menu
                  </Typography>
                  <Typography color="text.secondary">
                    {restaurant?.name}
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpenAddModal}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  px: 3,
                }}
              >
                Add Item
              </Button>
            </Stack>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontWeight: 600,
          }}
        >
          <MenuIcon color="primary" />
          Menu Items ({restaurant?.menu?.length || 0})
        </Typography>

        {restaurant?.menu?.length === 0 ? (
          <Card sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
            <MenuIcon sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              No menu items yet
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              Add your first menu item to get started
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenAddModal}
            >
              Add First Item
            </Button>
          </Card>
        ) : (
          <Stack spacing={2}>
            {restaurant?.menu.map((item) => (
              <Card key={item._id} sx={{ borderRadius: 2, boxShadow: 1 }}>
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center">
                    {/* Item Image */}
                    <Avatar
                      src={item.imageUrl}
                      alt={item.name}
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 2,
                        border: "2px solid",
                        borderColor: "divider",
                      }}
                    />

                    {/* Item Details */}
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, mb: 0.5 }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        {item.description}
                      </Typography>
                      <Typography
                        variant="h6"
                        color="primary.main"
                        sx={{ fontWeight: 700 }}
                      >
                        ₹{item.price}
                      </Typography>
                    </Box>

                    {/* Action Buttons */}
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        onClick={() => handleOpenEditModal(item)}
                        sx={{
                          color: "primary.main",
                          "&:hover": { bgcolor: "primary.light" },
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(item._id)}
                        sx={{
                          color: "error.main",
                          "&:hover": { bgcolor: "error.light" },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}

        {/* Add/Edit Item Modal */}
        <Dialog 
          open={open} 
          onClose={handleClose}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: { borderRadius: 3 }
          }}
        >
          <DialogTitle sx={{ pb: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Poppins, Arial, sans-serif",
                fontWeight: 600,
              }}
            >
              {isEditMode ? 'Edit Menu Item' : 'Add New Menu Item'}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Box component="form" id="menu-item-form" onSubmit={handleSubmit}>
              <TextField
                autoFocus
                margin="normal"
                label="Item Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
              <TextField
                margin="normal"
                label="Description"
                fullWidth
                multiline
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
              <TextField
                margin="normal"
                label="Price (₹)"
                type="number"
                fullWidth
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
              <TextField
                margin="normal"
                label="Image URL (optional)"
                fullWidth
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 1 }}>
            <Button 
              onClick={handleClose}
              sx={{ borderRadius: 2 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="menu-item-form"
              variant="contained"
              disabled={isAdding || isUpdating}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                px: 3,
              }}
            >
              {isAdding || isUpdating ? 'Saving...' : 'Save'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default ManageMenuPage;