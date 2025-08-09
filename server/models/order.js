import mongoose from "mongoose";
import User from "./user.js";
import Restaurant from "./restaurant.js";
import MenuItem from "./menuItem.js";

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Restaurant,
    required: true,
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      qty: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MenuItem,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  status: {
    type: String,
    required: true,
    default: "Placed",
    enum: ["Placed", "Preparing", "Out for Delivery", "Delivered", "Cancelled"],
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
