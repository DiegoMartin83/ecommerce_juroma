import { AppDataSource } from "../config/data-source.js";
import { Product } from "../entities/Product.js";

export const seedProducts = async () => {
  const productRepo = AppDataSource.getRepository(Product);

  const existing = await productRepo.count();
  if (existing > 0) {
    console.log("🧾 Productos ya existen, saltando seed.");
    return;
  }

  const products = [
    productRepo.create({
      product_name: "Zapatilla Full Negra",
      description: "Zapatilla urbana color negro",
      price: 50.0,
      stock: 500,
      imageUrl: undefined, // ✅ cambiamos null por undefined
    }),
    productRepo.create({
      product_name: "Zapatilla Full Blanca",
      description: "Zapatilla urbana color blanco",
      price: 55.0,
      stock: 300,
      imageUrl: undefined,
    }),
    productRepo.create({
      product_name: "Campera Azul",
      description: "Campera liviana impermeable azul",
      price: 120.0,
      stock: 100,
      imageUrl: undefined,
    }),
  ];

  await productRepo.save(products);
  console.log("✅ Productos cargados correctamente");
};
