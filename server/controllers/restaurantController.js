import Restaurant from "../models/restaurant.js";
import MenuItem from "../models/menuItem.js";

export const createRestaurant = async (req, res) => {
  try {
    const { name, address, cuisine, imageUrl } = req.body;
    if (!name || !address || !cuisine)
      return res
        .status(400)
        .json({ message: "Please provide all required fields." });
    const existing = await Restaurant.findOne({ name, address });
    if (existing)
      return res.status(400).json({
        message: "A restaurant with this name and address already exists.",
      });
    const newRestaurnat = new Restaurant({
      name,
      address,
      cuisine,
      imageUrl,
      owner: req.user._id,
    });
    const createdRestaurant = await newRestaurnat.save();
    res.status(201).json(createdRestaurant);
  } catch (err) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.json(restaurants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getMyRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ owner: req.user._id });
    res.json(restaurants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate(
      "menu"
    );
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found!!!" });
    res.json(restaurant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const addMenuItem = async (req, res) => {
  try {
    const { name, description, price, imageUrl } = req.body;
    console.log(req.params.id);
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found!!!" });
    if (restaurant.owner.toString() !== req.user._id.toString())
      return res.status(403).json({
        message: "User not authorized to add menu items to this restaurant",
      });
    const newMenuItem = new MenuItem({ name, description, price, imageUrl });
    const createdMenuItem = await newMenuItem.save();
    restaurant.menu.push(createdMenuItem._id);
    await restaurant.save();
    res.status(201).json({
      message: "Menu item added successfully",
      menuItem: createdMenuItem,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
