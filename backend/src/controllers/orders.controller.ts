// controllers/orderController.ts
import { AppDataSource } from "../config/data-source.js";
import { Order } from "../entities/Order.js";
import { Request, Response } from "express";

export const getOrdersByUser = async (req:Request, res:Response) => {
  try {
    const { id } = req.params;

    const orderRepo = AppDataSource.getRepository(Order);

    const orders = await orderRepo.find({
      where: { user: { id: Number(id) } },
      order: { createdAt: "DESC" } as any,
    });

    if (!orders.length) {
      return res.status(404).json({ message: "No se encontraron órdenes para este usuario." });
    }

    res.json(orders);
  } catch (error) {
    console.error("Error al obtener órdenes:", error);
    res.status(500).json({ message: "Error al obtener las órdenes del usuario." });
  }
};
