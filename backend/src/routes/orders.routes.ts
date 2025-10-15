import { Router } from "express";
import {
  createOrder,
  getUserOrders,
  getOrder,
} from "../controllers/orders.controller.js";

const router = Router();

/**
 * 🔹 Crear una nueva orden (checkout)
 * POST /api/orders
 * Body: { userId: number }
 */
router.post("/", createOrder);

/**
 * 🔹 Obtener todas las órdenes de un usuario
 * GET /api/orders/user/:userId
 */
router.get("/user/:userId", getUserOrders);

/**
 * 🔹 Obtener una orden específica por ID
 * GET /api/orders/:orderId
 */
router.get("/:orderId", getOrder);

export default router;
