import MenuItem from "../models/menuItem.js";
import Restaurant from "../models/restaurant.js";

export const updateMenuItem = async (req, res) => {
  try {
    const { name, description, price, imageUrl } = req.body;
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    const restaurant = await Restaurant.findOne({ menu: req.params.id });
    if (
      !restaurant ||
      restaurant.owner.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "User not authorized" });
    }
    menuItem.name = name || menuItem.name;
    menuItem.description = description || menuItem.description;
    menuItem.price = price || menuItem.price;
    menuItem.imageUrl = imageUrl || menuItem.imageUrl;
    const updatedMenuItem = await menuItem.save();
    res.json(updatedMenuItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    const restaurant = await Restaurant.findOne({ menu: req.params.id });
    if (
      !restaurant ||
      restaurant.owner.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "User not authorized" });
    }
    restaurant.menu.pull(req.params.id);
    await restaurant.save();
    // Delete the menu item itself
    await menuItem.deleteOne();
    res.json({ message: 'Menu item removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};