// src/services/orderService.ts
// import { AppDataSource } from "../config/data-source.js";
// import { Order } from "../entities/Order.js";
// import { OrderItem } from "../entities/OrderItem.js";
// import { Cart } from "../entities/Cart.js";
// import { CartItem } from "../entities/CartItem.js";
// import { User } from "../entities/User.js";

import { AppDataSource } from "../config/data-source.js";
import { Order, OrderStatus } from "../entities/Order.js";
import { OrderItem } from "../entities/OrderItem.js";
import { Cart } from "../entities/Cart.js";
import { CartItem } from "../entities/CartItem.js";

const orderRepository = AppDataSource.getRepository(Order);
const orderItemRepository = AppDataSource.getRepository(OrderItem);
const cartRepository = AppDataSource.getRepository(Cart);
const cartItemRepository = AppDataSource.getRepository(CartItem);

/**
 * Crea una orden a partir del carrito del usuario
 */
export const createOrderFromCart = async (userId: number) => {
  // ✅ Buscamos el carrito del usuario
  const cart = await cartRepository.findOne({
    where: { user: { id: userId } },
    relations: ["user", "items", "items.product"],
  });

  if (!cart) throw new Error("Carrito no encontrado");
  if (cart.items.length === 0) throw new Error("El carrito está vacío");

  // ✅ Calculamos el total
  const totalAmount = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // ✅ Creamos la orden principal
  const order = orderRepository.create({
    user: cart.user,
    totalAmount,
    status: OrderStatus.PENDING,
  });

  const savedOrder = await orderRepository.save(order);

  // ✅ Creamos los ítems de la orden
  const orderItems = cart.items.map((item) =>
    orderItemRepository.create({
      order: savedOrder,
      product: item.product,
      quantity: item.quantity,
      priceAtPurchase: item.product.price,
    })
  );

  await orderItemRepository.save(orderItems);

  // ✅ Vaciamos el carrito luego de crear la orden
  await cartItemRepository.remove(cart.items);
  cart.items = [];
  await cartRepository.save(cart);

  return savedOrder;
};

/**
 * Obtiene todas las órdenes del usuario
 */
export const getOrdersByUser = async (userId: number) => {
  return await orderRepository.find({
    where: { user: { id: userId } },
    relations: ["items", "items.product"],
    order: { createdAt: "DESC" },
  });
};

/**
 * Obtiene una orden por ID
 */
export const getOrderById = async (orderId: number) => {
  return await orderRepository.findOne({
    where: { id: orderId },
    relations: ["user", "items", "items.product"],
  });
};
