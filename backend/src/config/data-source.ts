// import "reflect-metadata";
// import { DataSource } from "typeorm";

// import { User } from "../entities/User.ts"
// import { Product } from "../entities/Product.ts";
// import { Auth } from "../entities/Auth.ts"

// export const AppDataSource = new DataSource({
//   type: "mysql",
//   host: process.env.DB_HOST,
//   port: Number(process.env.DB_PORT) || 3306,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   synchronize: true, // ⚠️ en desarrollo: crea tablas automáticamente
//   logging: false,
//   entities: [User, Product, Auth],
//   migrations: [],
//   subscribers: [],
// });


import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

// 👇 carga variables desde .env
dotenv.config();
import { User } from "../entities/User.js";
import { Product } from "../entities/Product.js";
import { Auth } from "../entities/Auth.js";
 import { Cart } from "../entities/Cart.js";
 import { CartItem } from "../entities/CartItem.js";
 import { Order } from "../entities/Order.js";
import { OrderItem } from "../entities/OrderItem.js";
import { Payment } from "../entities/Payment.js";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // ⚠️ crea tablas automáticamente en dev
  logging: false,
  // entities: [User, Product,Order, Order, Auth, Cart, CartItem],
    entities: [User, Product,Order, Order, Auth, Cart, CartItem, Order, OrderItem, Payment],
  migrations: [],
  subscribers: [],
});
