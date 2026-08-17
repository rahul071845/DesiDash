import Order from "../models/order.js";
import MenuItem from "../models/menuItem.js";
import Restaurant from "../models/restaurant.js";

export const createOrder = async (req, res) => {
  try {
    const { orderItems, restaurantId } = req.body;
    if (!orderItems || orderItems.length === 0)
      return res.status(400).json({ message: "No order items" });
    let totalPrice = 0;
    const itemsWithPrices = await Promise.all(
      orderItems.map(async (item) => {
        const menuItem = await MenuItem.findById(item.menuItem);
        totalPrice += menuItem.price * item.qty;
        return { ...item, name: menuItem.name, price: menuItem.price };
      })
    );
    const order = new Order({
      orderItems: itemsWithPrices,
      customer: req.user._id,
      restaurant: restaurantId,
      totalPrice,
    });
    const createdOrder = await order.save();
    const restaurant = await Restaurant.findById(restaurantId);
    if (restaurant) {
      const ownerId = restaurant.owner.toString();
      req.io.to(ownerId).emit("new_order", createdOrder);
    }
    res.status(201).json(createdOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user._id }).populate(
      "restaurant",
      "name"
    );
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getRestaurantOrders = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });
    if (restaurant.owner.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "User not authorized" });
    const orders = await Order.find({
      restaurant: req.params.restaurantId,
    }).populate("customer", "name email");
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("restaurant");
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.restaurant.owner.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "User not authorized" });
    order.status = req.body.status || order.status;
    const updatedOrder = await order.save();

    // Emit real-time update to the customer's socket room
    if (updatedOrder.customer) {
      req.io.to(updatedOrder.customer.toString()).emit("order_status_updated", updatedOrder);
    }

    res.json(updatedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
