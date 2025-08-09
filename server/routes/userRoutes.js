import express from "express";
import {
  loginUser,
  registerUser,
  getUserProfile,
  logoutUser,
} from "../controllers/userController.js";
import { userVerification } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/profile").get(userVerification, getUserProfile);

export default router;