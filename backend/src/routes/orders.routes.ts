// src/routes/order.routes.ts

import { Router } from "express";
import { createOrderFromCart } from "../controllers/orders.controller.js";

const router = Router();

// 🛒 Crear una orden a partir del carrito del usuario
router.post("/:userId/checkout", createOrderFromCart);

export default router;

