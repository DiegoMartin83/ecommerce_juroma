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

// import { Request, Response } from "express";
// import { AppDataSource } from "../config/data-source.js";
// import { Cart } from "../entities/Cart.js";
// import { Product } from "../entities/Product.js";

// // Repositorios
// const cartRepository = AppDataSource.getRepository(Cart);
// const productRepository = AppDataSource.getRepository(Product);

// /* ============================================================
//    OBTENER CARRITO DE UN USUARIO (GET /cart/:userId)
//    ============================================================ */
// export const getCartByUser = async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.params;

//     const cart = await cartRepository.findOne({
//       where: { userId: parseInt(userId, 10) },
//     });

//     if (!cart) {
//       return res.status(200).json({ message: "Carrito vacío", items: [] });
//     }

//     return res.status(200).json(cart);
//   } catch (error) {
//     console.error("Error al obtener carrito:", error);
//     return res.status(500).json({ message: "Error interno del servidor" });
//   }
// };

// /* ============================================================
//    AGREGAR PRODUCTO AL CARRITO (POST /cart)
//    ============================================================ */
// export const createCart = async (req: Request, res: Response) => {
//   try {
//     const { userId, productId, quantity } = req.body;

//     // Buscamos el producto
//     const product = await productRepository.findOne({ where: { id: productId } });
//     if (!product) return res.status(404).json({ message: "Producto no encontrado" });

//     // Buscamos si el usuario ya tiene carrito
//     let cart = await cartRepository.findOne({
//       where: { userId: parseInt(userId, 10) },
//     });

//     if (!cart) {
//       // Creamos nuevo carrito
//       cart = cartRepository.create({
//         userId,
//         items: [
//           {
//             productId,
//             name: product.name,
//             price: product.price,
//             quantity,
//           },
//         ],
//       });
//     } else {
//       // Si ya existe, actualizamos o agregamos producto
//       const existingItem = cart.items.find((i) => i.productId === productId);
//       if (existingItem) {
//         existingItem.quantity += quantity;
//       } else {
//         cart.items.push({
//           productId,
//           name: product.name,
//           price: product.price,
//           quantity,
//         });
//       }
//     }

//     const savedCart = await cartRepository.save(cart);
//     return res.status(200).json(savedCart);
//   } catch (error) {
//     console.error("Error al crear/agregar producto al carrito:", error);
//     return res.status(500).json({ message: "Error interno del servidor" });
//   }
// };

// /* ============================================================
//    ELIMINAR PRODUCTO DEL CARRITO (DELETE /cart/:userId/:productId)
//    ============================================================ */
// export const removeFromCart = async (req: Request, res: Response) => {
//   try {
//     const { userId, productId } = req.params;

//     const cart = await cartRepository.findOne({
//       where: { userId: parseInt(userId, 10) },
//     });

//     if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });

//     cart.items = cart.items.filter((i) => i.productId !== parseInt(productId, 10));
//     const updatedCart = await cartRepository.save(cart);

//     return res.status(200).json(updatedCart);
//   } catch (error) {
//     console.error("Error al eliminar producto del carrito:", error);
//     return res.status(500).json({ message: "Error interno del servidor" });
//   }
// };

// /* ============================================================
//    VACIAR CARRITO (DELETE /cart/:userId)
//    ============================================================ */
// export const clearCart = async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.params;

//     const cart = await cartRepository.findOne({
//       where: { userId: parseInt(userId, 10) },
//     });

//     if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });

//     cart.items = [];
//     const clearedCart = await cartRepository.save(cart);

//     return res.status(200).json({
//       message: "Carrito vaciado correctamente",
//       cart: clearedCart,
//     });
//   } catch (error) {
//     console.error("Error al vaciar carrito:", error);
//     return res.status(500).json({ message: "Error interno del servidor" });
//   }
// };
import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source.js";
import { Cart } from "../entities/Cart.js";
import { CartItem } from "../entities/CartItem.js";
import { Product } from "../entities/Product.js";
import { User } from "../entities/User.js";

/* ============================================================
   🔹 Repositorios de cada entidad
   ============================================================ */
const cartRepository = AppDataSource.getRepository(Cart);
const cartItemRepository = AppDataSource.getRepository(CartItem);
const productRepository = AppDataSource.getRepository(Product);
const userRepository = AppDataSource.getRepository(User);

/* ============================================================
   🛒 CREAR O ACTUALIZAR CARRITO (POST /api/cart)
   ============================================================ */
export const addToCart = async (req: Request, res: Response) => {
  try {
    const { userId, productId, quantity } = req.body;

    // ✅ Validamos existencia de usuario
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    // ✅ Validamos existencia del producto
    const product = await productRepository.findOne({ where: { id: productId } });
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });

    // ✅ Buscamos si ya existe un carrito para el usuario
    let cart = await cartRepository.findOne({
      where: { user: { id: userId } },
      relations: ["items", "items.product"],
    });

    // ✅ Si no existe, lo creamos
    if (!cart) {
      cart = cartRepository.create({ user, items: [] });
      await cartRepository.save(cart);
    }

    // ✅ Verificamos si el producto ya está en el carrito
    let item = cart.items.find((i:any) => i.product.id === productId);

    if (item) {
      // Si ya está, actualizamos cantidad
      item.quantity += quantity;
    } else {
      // Si no está, creamos nuevo CartItem
      item = cartItemRepository.create({
        cart,
        product,
        quantity,
        priceAtAdd: product.price,
      });
      cart.items.push(item);
    }

    // ✅ Guardamos carrito e ítems actualizados
    await cartRepository.save(cart);

    return res.status(200).json({
      message: "Producto agregado/actualizado en el carrito",
      cart,
    });
  } catch (error) {
    console.error("Error al agregar producto al carrito:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// /* ============================================================
//    🔍 OBTENER CARRITO POR USUARIO (GET /api/cart/:userId)
//    ============================================================ */
// export const getCartByUser = async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.params;

//     // ✅ Buscamos carrito del usuario con ítems y productos
//     const cart = await cartRepository.findOne({
//       where: { user: { id: parseInt(userId, 10) } },
//       relations: ["items", "items.product"],
//     });

//     if (!cart) return res.status(200).json({ message: "Carrito vacío", items: [] });

//     // ✅ Calculamos total general
//     const total = cart.items.reduce(
//       (acc:any, item:any) => acc + item.quantity * Number(item.priceAtAdd),
//       0
//     );

//     return res.status(200).json({
//       userId,
//       total,
//       items: cart.items.map((i:any) => ({
//         id: i.id,
//         product: i.product?.product_name || "(Producto eliminado)",
//         quantity: i.quantity,
//         price: i.priceAtAdd,
//         subtotal: i.quantity * Number(i.priceAtAdd),
//       })),
//     });
//   } catch (error) {
//     console.error("Error al obtener carrito:", error);
//     return res.status(500).json({ message: "Error interno del servidor" });
//   }
// };

/* ============================================================
   🔍 OBTENER CARRITO POR USUARIO (GET /api/cart/:userId)
   ============================================================ */
// export const getCartByUser = async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.params;

//     // ✅ Buscamos carrito del usuario con sus ítems, productos y datos del usuario
//     const cart = await cartRepository.findOne({
//       where: { user: { id: parseInt(userId, 10) } },
//       relations: ["user", "items", "items.product"],
//     });

//     // ✅ Si no tiene carrito, devolvemos vacío
//     if (!cart) {
//       return res.status(200).json({ 
//         message: "Carrito vacío", 
//         userId, 
//         items: [], 
//         total: 0 
//       });
//     }

//     // ✅ Calculamos el total general
//     const total = cart.items.reduce(
//       (acc: number, item: any) => acc + item.quantity * Number(item.priceAtAdd),
//       0
//     );

//     // ✅ Armamos la respuesta con formato claro
   

//     return res.status(200).json({
//       message: "Carrito encontrado",
//       user: {
//         id: cart.user.id,
//         name: cart.user.user_name,
//         email: cart.user.email,
//       },
//       total,
//       items: cart.items.map((i: any) => ({
        
//         id: i.id,
//         product: i.product
//           ? {
//               id: i.product.id,
//               name: i.product.product_name, // 👈 acá usamos tu propiedad real
//               description: i.product.description,
//               price: i.product.price,
//             }
            
//           : "(Producto eliminado)",
//         quantity: i.quantity,
//         priceAtAdd: i.priceAtAdd,
//         subtotal: i.quantity * Number(i.priceAtAdd),
//       })),
//     });
//   } catch (error) {
//     console.error("Error al obtener carrito:", error);
//     return res.status(500).json({ message: "Error interno del servidor" });
//   }
// };

export const getCartByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // Traemos carrito + relaciones
    const cart = await cartRepository.findOne({
      where: { user: { id: parseInt(userId, 10) } },
      relations: ["user", "items", "items.product"],
    });

    if (!cart) {
      return res.status(200).json({
        message: "Carrito vacío",
        userId,
        items: [],
        total: 0,
      });
    }

    // Calculamos total
    const total = cart.items.reduce(
      (acc: number, item: any) => acc + item.quantity * Number(item.priceAtAdd),
      0
    );

    // ---------- AQUI: mapeo con console.log dentro del map ----------
    return res.status(200).json({
      message: "Carrito encontrado",
      user: {
        id: cart.user.id,
        name: cart.user.user_name,
        email: cart.user.email,
      },
      total,
      items: cart.items.map((i: any) => {
        // <-- Console log CORRECTAMENTE ubicado: dentro del map y antes del return del item
        console.log("🧾 Item del carrito (i.product):", i.product);

        return {
          id: i.id,
          product: i.product
            ? {
                id: i.product.id,
                name: i.product.product_name, // usa tu propiedad real
                description: i.product.description,
                price: i.product.price,
              }
            : "(Producto eliminado)",
          quantity: i.quantity,
          priceAtAdd: i.priceAtAdd,
          subtotal: i.quantity * Number(i.priceAtAdd),
        };
      }),
    });
    // ----------------------------------------------------------------
  } catch (error) {
    console.error("Error al obtener carrito:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};



/* ============================================================
   ❌ ELIMINAR PRODUCTO DEL CARRITO (DELETE /api/cart/:userId/:productId)
   ============================================================ */
export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.params;

    // ✅ Buscamos carrito del usuario
    const cart = await cartRepository.findOne({
      where: { user: { id: parseInt(userId, 10) } },
      relations: ["items", "items.product"],
    });

    if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });

    // ✅ Buscamos item específico
    const itemToRemove = cart.items.find((i:any) => i.product.id === parseInt(productId, 10));
    if (!itemToRemove)
      return res.status(404).json({ message: "Producto no encontrado en el carrito" });

    // ✅ Eliminamos item
    await cartItemRepository.remove(itemToRemove);

    return res.status(200).json({ message: "Producto eliminado del carrito" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

/* ============================================================
   🧹 VACIAR CARRITO (DELETE /api/cart/:userId)
   ============================================================ */
export const clearCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // ✅ Buscamos carrito con ítems
    const cart = await cartRepository.findOne({
      where: { user: { id: parseInt(userId, 10) } },
      relations: ["items"],
    });

    if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });

    // ✅ Eliminamos todos los ítems asociados
    await cartItemRepository.remove(cart.items);

    return res.status(200).json({ message: "Carrito vaciado correctamente" });
  } catch (error) {
    console.error("Error al vaciar carrito:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

/* ============================================================
   ✅ LISTAR ITEMS DEL CARRITO
   ============================================================ */

export const getCartItemsClean = async (req:Request, res:Response) => {
  try {
    const { userId } = req.params;

    const cart = await AppDataSource.getRepository(Cart)
      .createQueryBuilder("cart")
      .leftJoinAndSelect("cart.user", "user")
      .leftJoinAndSelect("cart.items", "item")
      .leftJoinAndSelect("item.product", "product")
      .where("cart.user = :userId", { userId })
      .getOne();

    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    return res.json(cart);
  } catch (error) {
    console.error("Error obteniendo carrito:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getCartWithItems = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const cart = await cartRepository.findOne({
      where: { user: { id: parseInt(userId, 10) } },
      relations: ["items", "items.product"],
    });

    if (!cart) {
      return res.status(200).json({ message: "Carrito vacío", items: [] });
    }

    const items = cart.items.map((item: any) => ({
      id: item.id,
      productId: item.product.id,
      productName: item.product.product_name,
      description: item.product.description,
      quantity: item.quantity,
      priceAtAdd: item.priceAtAdd,
      subtotal: item.quantity * Number(item.priceAtAdd),
    }));

    return res.status(200).json({ message: "Ítems del carrito", items });
  } catch (error) {
    console.error("Error al obtener ítems del carrito:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
