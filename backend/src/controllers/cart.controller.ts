// import { AppDataSource } from "../config/data-source.js";
// import { Cart } from "../entities/Cart.js";
// import { Request, Response } from "express";

// /**
//  * Controlador de carrito (cart)
//  * Se basa únicamente en userId e items, sin relaciones directas.
//  */

// const cartRepository = AppDataSource.getRepository(Cart);

// // 🛒 Crear un carrito nuevo
// export const createCart = async (req:Request, res: Response) => {
//   try {
//     const { userId, items } = req.body;

//     // Validación básica
//     if (!userId || !items || !Array.isArray(items)) {
//       return res.status(400).json({ message: "Datos inválidos" });
//     }

//     const newCart = cartRepository.create({ userId, items });
//     await cartRepository.save(newCart);

//     return res.status(201).json(newCart);
//   } catch (error) {
//     console.error("Error al crear carrito:", error);
//     res.status(500).json({ message: "Error interno del servidor" });
//   }
// };

// // 📦 Obtener todos los carritos
// export const getCarts = async (req:Request, res: Response) => {
//   try {
//     const carts = await cartRepository.find();
//     return res.json(carts);
//   } catch (error) {
//     console.error("Error al obtener carritos:", error);
//     res.status(500).json({ message: "Error interno del servidor" });
//   }
// };

// // 👤 Obtener carrito por usuario
// export const getCartByUser = async (req:Request, res: Response) => {
//   try {
//     const { userId } = req.params;
//     const cart = await cartRepository.findOneBy({ userId: Number(userId) });

//     if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });

//     return res.json(cart);
//   } catch (error) {
//     console.error("Error al obtener carrito por usuario:", error);
//     res.status(500).json({ message: "Error interno del servidor" });
//   }
// };

// // 🧹 Vaciar un carrito
// export const clearCart = async (req:Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const cart = await cartRepository.findOneBy({ id: Number(id) });

//     if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });

//     cart.items = []; // Se limpia el contenido
//     await cartRepository.save(cart);

//     return res.json({ message: "Carrito vaciado con éxito" });
//   } catch (error) {
//     console.error("Error al vaciar carrito:", error);
//     res.status(500).json({ message: "Error interno del servidor" });
//   }
// };

import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source.js";
import { Cart } from "../entities/Cart.js";
import { Product } from "../entities/Product.js";

// Repositorios
const cartRepository = AppDataSource.getRepository(Cart);
const productRepository = AppDataSource.getRepository(Product);

/* ============================================================
   OBTENER CARRITO DE UN USUARIO (GET /cart/:userId)
   ============================================================ */
export const getCartByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const cart = await cartRepository.findOne({
      where: { userId: parseInt(userId, 10) },
    });

    if (!cart) {
      return res.status(200).json({ message: "Carrito vacío", items: [] });
    }

    return res.status(200).json(cart);
  } catch (error) {
    console.error("Error al obtener carrito:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

/* ============================================================
   AGREGAR PRODUCTO AL CARRITO (POST /cart)
   ============================================================ */
export const createCart = async (req: Request, res: Response) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Buscamos el producto
    const product = await productRepository.findOne({ where: { id: productId } });
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });

    // Buscamos si el usuario ya tiene carrito
    let cart = await cartRepository.findOne({
      where: { userId: parseInt(userId, 10) },
    });

    if (!cart) {
      // Creamos nuevo carrito
      cart = cartRepository.create({
        userId,
        items: [
          {
            productId,
            name: product.name,
            price: product.price,
            quantity,
          },
        ],
      });
    } else {
      // Si ya existe, actualizamos o agregamos producto
      const existingItem = cart.items.find((i) => i.productId === productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({
          productId,
          name: product.name,
          price: product.price,
          quantity,
        });
      }
    }

    const savedCart = await cartRepository.save(cart);
    return res.status(200).json(savedCart);
  } catch (error) {
    console.error("Error al crear/agregar producto al carrito:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

/* ============================================================
   ELIMINAR PRODUCTO DEL CARRITO (DELETE /cart/:userId/:productId)
   ============================================================ */
export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.params;

    const cart = await cartRepository.findOne({
      where: { userId: parseInt(userId, 10) },
    });

    if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });

    cart.items = cart.items.filter((i) => i.productId !== parseInt(productId, 10));
    const updatedCart = await cartRepository.save(cart);

    return res.status(200).json(updatedCart);
  } catch (error) {
    console.error("Error al eliminar producto del carrito:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

/* ============================================================
   VACIAR CARRITO (DELETE /cart/:userId)
   ============================================================ */
export const clearCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const cart = await cartRepository.findOne({
      where: { userId: parseInt(userId, 10) },
    });

    if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });

    cart.items = [];
    const clearedCart = await cartRepository.save(cart);

    return res.status(200).json({
      message: "Carrito vaciado correctamente",
      cart: clearedCart,
    });
  } catch (error) {
    console.error("Error al vaciar carrito:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
