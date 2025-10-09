import { Router } from "express";
import { createCart, getCartByUser, clearCart } from "../controllers/cart.controller.js";

/**
 * Rutas del carrito
 * Se declaran los endpoints principales para interactuar con el carrito desde el frontend.
 */

const router = Router();

// POST /cart → crear nuevo carrito
router.post("/", createCart);

// GET /cart → obtener todos los carritos
//  router.get("/api", getCarts);

// GET /cart/user/:userId → obtener carrito de un usuario
router.get("/user/:userId", getCartByUser);

// DELETE /cart/:id → vaciar carrito por id
router.delete("/:id", clearCart);

export default router;
