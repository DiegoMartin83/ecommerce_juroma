// src/controllers/order.controller.ts

import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source.js";
import { Cart } from "../entities/Cart.js";
import { Order } from "../entities/Order.js";
import { OrderItem } from "../entities/OrderItem.js";
import { OrderStatus } from "../entities/Order.js";
import { CartItem } from "../entities/CartItem.js";

export const createOrderFromCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const cartRepository = AppDataSource.getRepository(Cart);
    const orderRepository = AppDataSource.getRepository(Order);
    const orderItemRepository = AppDataSource.getRepository(OrderItem);
    const cartItemRepository = AppDataSource.getRepository(CartItem);

    // ✅ Buscamos el carrito con sus ítems y productos
    const cart = await cartRepository.findOne({
      where: { user: { id: parseInt(userId, 10) } },
      relations: ["items", "items.product", "user"],
    });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "El carrito está vacío o no existe" });
    }

    // ✅ Calculamos total
    const total = cart.items.reduce(
      (acc, item) => acc + item.quantity * Number(item.priceAtAdd),
      0
    );

    // ✅ Creamos la orden
    const order = orderRepository.create({
      user: cart.user,
      total,
      status: OrderStatus.PENDING,
    });

    await orderRepository.save(order);

    // ✅ Creamos los ítems de la orden
    const orderItems = cart.items.map((item) =>
      orderItemRepository.create({
        order,
        product: item.product,
        quantity: item.quantity,
        priceAtPurchase: item.priceAtAdd,
      })
    );

    await orderItemRepository.save(orderItems);

    // ✅ Vaciamos el carrito
    await cartItemRepository.remove(cart.items);

    return res.status(201).json({
      message: "Orden creada exitosamente",
      order: {
        id: order.id,
        total,
        status: order.status,
        user: { id: cart.user.id, name: cart.user.user_name, email: cart.user.email },
        items: orderItems.map((i) => ({
          product: i.product.product_name,
          quantity: i.quantity,
          price: i.priceAtPurchase,
        })),
      },
    });
  } catch (error) {
    console.error("Error creando orden:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
