import express from "express";
import { userVerification } from "../middleware/authMiddleware.js";
import {
  createOrder,
  getMyOrders,
  getRestaurantOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

router.route("/").post(userVerification, createOrder);
router.route("/myorders").get(userVerification, getMyOrders);
router
  .route("/restaurant/:restaurantId")
  .get(userVerification, getRestaurantOrders);
router.route("/:id/status").put(userVerification, updateOrderStatus);

export default router;
