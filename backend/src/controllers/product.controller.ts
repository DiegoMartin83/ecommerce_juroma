import { Request, Response } from "express";
import pool from "../models/db.ts";


// Listar productos
export const getProducts = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error });
  }
};

// Crear producto
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, stock } = req.body;
    const [result] = await pool.query(
      "INSERT INTO products (name, price, stock) VALUES (?, ?, ?)",
      [name, price, stock]
    );
    res.json({ message: "Producto creado", result });
  } catch (error) {
    res.status(500).json({ message: "Error al crear producto", error });
  }
};
