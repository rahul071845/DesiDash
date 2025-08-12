import express from "express";
import {
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuItemController.js";
import { userVerification } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/:id')
  .put(userVerification, updateMenuItem)
  .delete(userVerification, deleteMenuItem);

export default router;