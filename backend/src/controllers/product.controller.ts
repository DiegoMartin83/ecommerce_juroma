// import { Request, Response } from "express";
// import pool from "../models/db.ts";


// // Listar productos
// export const getProducts = async (req: Request, res: Response) => {
//   try {
//     const [rows] = await pool.query("SELECT * FROM products");
//     res.json(rows);
//   } catch (error) {
//     res.status(500).json({ message: "Error al obtener productos", error });
//   }
// };

// // Crear producto
// export const createProduct = async (req: Request, res: Response) => {
//   try {
//     const { name, price, stock } = req.body;
//     const [result] = await pool.query(
//       "INSERT INTO products (name, price, stock) VALUES (?, ?, ?)",
//       [name, price, stock]
//     );
//     res.json({ message: "Producto creado", result });
//   } catch (error) {
//     res.status(500).json({ message: "Error al crear producto", error });
//   }
// };

import { AppDataSource } from "../config/data-source.ts";
import { Product } from "../entities/Product.ts";
import { Request, Response } from "express";

const productRepository = AppDataSource.getRepository(Product);

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = productRepository.create(req.body);
    const result = await productRepository.save(product);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: "Error al crear producto", error });
  }
};

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await productRepository.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await productRepository.findOneBy({ id: parseInt(req.params.id) });
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener producto", error });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await productRepository.findOneBy({ id: parseInt(req.params.id) });
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });

    productRepository.merge(product, req.body);
    const result = await productRepository.save(product);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar producto", error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const result = await productRepository.delete(req.params.id);
    if (result.affected === 0) return res.status(404).json({ message: "Producto no encontrado" });
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar producto", error });
  }
};
