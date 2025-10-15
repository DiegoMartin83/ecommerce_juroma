import { Request, Response } from "express";
import {
  createOrderFromCart,
  getOrdersByUser,
  getOrderById,
} from "../services/orders.service.js";

/**
 * Crea una nueva orden desde el carrito del usuario
 */
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body; // o req.params según la ruta

    if (!userId) {
      return res.status(400).json({ message: "Falta el userId" });
    }

    const order = await createOrderFromCart(userId);
    return res.status(201).json({
      message: "Orden creada exitosamente",
      order,
    });
  } catch (error: any) {
    console.error("Error creando la orden:", error);
    return res.status(500).json({ message: error.message || "Error interno" });
  }
};

/**
 * Lista todas las órdenes del usuario
 */
export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orders = await getOrdersByUser(parseInt(userId, 10));

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error obteniendo órdenes:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

/**
 * Obtiene una orden específica por ID
 */
export const getOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const order = await getOrderById(parseInt(orderId, 10));

    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error("Error obteniendo orden:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
