import { Router } from "express";
import { addToCart, getCartByUser, clearCart, getCartWithItems,getCartItemsClean, updateCartItem } from "../controllers/cart.controller.js";

/**
 * Rutas del carrito
 * Se declaran los endpoints principales para interactuar con el carrito desde el frontend.
 */

const router = Router();

// POST /cart → crear nuevo carrito
router.post("/", addToCart);

// GET /cart → obtener todos los carritos
  //router.get("/api", getCarts);

// GET /cart/user/:userId → obtener carrito de un usuario
router.get("/user/:userId", getCartByUser);

// DELETE /cart/:id → vaciar carrito por id
router.delete("/:id", clearCart);

router.get("/:userId/items", getCartWithItems);
router.get("/:userId/items/clean", getCartItemsClean);

router.put("/:userId/update", updateCartItem);


export default router;
