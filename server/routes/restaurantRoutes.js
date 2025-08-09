import express from "express";
import {
  addMenuItem,
  createRestaurant,
  getMyRestaurants,
  getRestaurant,
  getRestaurants,
} from "../controllers/restaurantController.js";
import { userVerification } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(userVerification, createRestaurant).get(getRestaurants);
router.route("/myrestaurants").get(userVerification, getMyRestaurants);
router.route("/:id").get(getRestaurant);
router.route("/:id/menuitems").post(userVerification, addMenuItem);

export default router;
