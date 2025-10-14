import { AppDataSource } from "../config/data-source.js";
import { Cart } from "../entities/Cart.js";
import { CartItem } from "../entities/CartItem.js";
import { User } from "../entities/User.js";
import { Product } from "../entities/Product.js";

export const seedCarts = async () => {
  const cartRepo = AppDataSource.getRepository(Cart);
  const userRepo = AppDataSource.getRepository(User);
  const productRepo = AppDataSource.getRepository(Product);
  const cartItemRepo = AppDataSource.getRepository(CartItem);

  const users = await userRepo.find();
  const products = await productRepo.find();

  if (users.length === 0 || products.length === 0) {
    console.log("⚠️ No hay usuarios o productos, ejecutá primero sus seeds.");
    return;
  }

  const existing = await cartRepo.count();
  if (existing > 0) {
    console.log("🛒 Carritos ya existen, saltando seed.");
    return;
  }

  // Creamos un carrito para el primer usuario
  const cart = cartRepo.create({ user: users[0] });
  await cartRepo.save(cart);

  // Agregamos items al carrito
  const item1 = cartItemRepo.create({
    cart,
    product: products[0],
    quantity: 2,
  });

  const item2 = cartItemRepo.create({
    cart,
    product: products[1],
    quantity: 1,
  });

  await cartItemRepo.save([item1, item2]);

  console.log("✅ Carrito e items creados correctamente");
};
