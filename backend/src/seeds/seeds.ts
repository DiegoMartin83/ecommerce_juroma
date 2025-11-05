import { AppDataSource } from "../config/data-source.js";
import { User } from "../entities/User.js";
import { Product } from "../entities/Product.js";
import { Cart } from "../entities/Cart.js";
import { CartItem } from "../entities/CartItem.js";
import { Order, OrderStatus } from "../entities/Order.js";

const seedDatabase = async () => {
  try {
    console.log("🔄 Conectando a la base de datos...");
    await AppDataSource.initialize();
    console.log("✅ Conexión establecida.");

    const userRepo = AppDataSource.getRepository(User);
    const productRepo = AppDataSource.getRepository(Product);
    const cartRepo = AppDataSource.getRepository(Cart);
    const cartItemRepo = AppDataSource.getRepository(CartItem);
    const orderRepo = AppDataSource.getRepository(Order);

    // 🧍‍♂️ Usuarios
    const usersData = [
      { username: "admin", email: "admin@example.com", password: "123456" },
      { username: "cliente", email: "cliente@example.com", password: "123456" },
    ];
    const users = usersData.map((data) => userRepo.create(data));
    await userRepo.save(users);
    console.log("✅ Usuarios creados:", users.map((u) => u.user_name));

    // 🛍️ Productos
    const productsData = [
      {
        product_name: "Zapatillas Urban",
        description: "Zapatillas de estilo urbano con diseño moderno.",
        price: 25000,
        stock: 20,
        imageUrl: "https://via.placeholder.com/150",
      },
      {
        product_name: "Campera Rompeviento",
        description: "Campera liviana e impermeable ideal para días ventosos.",
        price: 32000,
        stock: 15,
        imageUrl: "https://via.placeholder.com/150",
      },
      {
        product_name: "Remera Oversize",
        description: "Remera de algodón peinado de corte oversize.",
        price: 12000,
        stock: 40,
        imageUrl: "https://via.placeholder.com/150",
      },
    ];
    const products = productsData.map((data) => productRepo.create(data));
    await productRepo.save(products);
    console.log("✅ Productos creados:", products.map((p) => p.product_name));

    // 🛒 Carrito para el cliente
    const clientUser = users.find((u) => u.user_name === "cliente");
    if (!clientUser) throw new Error("Usuario cliente no encontrado");

    const cart = cartRepo.create({
      user: clientUser,
      items: [],
    });
    await cartRepo.save(cart);
    console.log("🛒 Carrito creado para:", clientUser.user_name);

    // 🧩 Items del carrito
    const cartItemsData = [
      { cart, product: products[0], quantity: 2 },
      { cart, product: products[1], quantity: 1 },
    ];
    const cartItems = cartItemsData.map((data) => cartItemRepo.create(data));
    await cartItemRepo.save(cartItems);
    console.log("✅ Items del carrito creados.");

    // 💰 Orden simulada (a partir del carrito)
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const order = orderRepo.create({
      user: clientUser,
      totalAmount,
      status: OrderStatus.PENDING,
    });
    await orderRepo.save(order);

    console.log("✅ Orden creada para:", clientUser.user_name);
    console.log("💵 Total:", totalAmount);

    console.log("🎉 SEED ejecutado correctamente");
    await AppDataSource.destroy();
  } catch (error) {
    console.error("❌ Error ejecutando seed:", error);
    await AppDataSource.destroy();

    console.log(`
🌱 ========================================
✅ Seeds ejecutados correctamente
🧑‍💻 Usuarios, productos y carritos insertados
💾 Base de datos inicial lista para pruebas
======================================== 🌱
`);

  }
};

seedDatabase();
