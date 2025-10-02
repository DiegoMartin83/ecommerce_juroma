// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import authRoutes from "./routes/auth.routes"
// import productRoutes from "./routes/product.routes"; // ✅
// import usersRoutes from "./routes/users.routes";
// import "reflect-metadata";
// import { AppDataSource } from "./config/data-source";


// dotenv.config();

// const app = express();

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // Rutas Productos

// app.use("/api/products", productRoutes);

// //Rutas Usuarios
// app.use("/api/users", usersRoutes);



// //Rutas Auth
// app.use("/api/auth", authRoutes);

// const PORT = process.env.PORT || 4000;

// AppDataSource.initialize()
//   .then(() => {
//     console.log("📦 Conexión a la base de datos establecida");
//     app.listen(4000, () => {
//       console.log("🚀 Servidor corriendo en http://localhost:4000");
//     });
//   })
//   .catch((error) => console.error("❌ Error en la conexión DB:", error));

// // app.listen(PORT, () => {
// //   // console.log("");
// //   console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
// // });

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
 import authRoutes from "./routes/auth.routes.ts";
import productRoutes from "./routes/product.routes.ts";
import usersRoutes from "./routes/users.routes.ts";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source.ts";

dotenv.config();
// 👇 acá probamos si se están leyendo las variables
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/products", productRoutes);
app.use("/api/users", usersRoutes);
 app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 4000;

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Conexión a la base de datos establecida");
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error("❌ Error en la conexión DB:", error));
