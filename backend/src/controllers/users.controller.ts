// import { Request, Response } from "express";
// import { AppDataSource } from "../config/data-source.js"; // 👉 conexión a la DB con TypeORM
// import { User } from "../entities/User.js"; // 👉 nuestra entidad User (tabla)
// import bcrypt from "bcrypt"; // 👉 librería para encriptar contraseñas

// // Repositorio = una especie de "puente" entre la entidad y la base de datos
// // nos da métodos listos: find, findOne, save, delete, etc.
// const userRepository = AppDataSource.getRepository(User);

// // ======================================
// // 📍 Controlador: Registrar Usuario
// // ======================================
// export const registerUser = async (req: Request, res: Response) => {
//   try {
//     // 1) Obtenemos los datos que llegan en la request (body del POST)
//     const { name, email, password } = req.body;

//     // 2) Validamos que estén completos
//     if (!name || !email || !password) {
//       return res.status(400).json({ error: "Todos los campos son obligatorios" });
//     }

//     // 3) Verificamos si ya existe un usuario con ese email
//     const existingUser = await userRepository.findOne({ where: { email } });
//     if (existingUser) {
//       return res.status(400).json({ error: "El usuario ya está registrado" });
//     }

//     // 4) Encriptamos la contraseña antes de guardarla
//     // bcrypt.hash(texto, númeroDeVueltasDeHash)
//     // El número 10 es un "costo de procesamiento", más alto = más seguro pero más lento
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // 5) Creamos un nuevo objeto User (sin guardarlo aún en la DB)
//     // create() es como armar una instancia de la entidad
//     const newUser = userRepository.create({
//       name,
//       email,
//       password: hashedPassword, // Guardamos la contraseña encriptada
//     });

//     // 6) Guardamos el usuario en la base
//     await userRepository.save(newUser);

//     // 7) Respondemos al cliente con el usuario creado (sin mostrar el password)
//     return res.status(201).json({
//       message: "✅ Usuario registrado exitosamente",
//       user: {
//         id: newUser.id,
//         name: newUser.name,
//         email: newUser.email,
//         // 👀 Importante: nunca devolvemos la contraseña
//       },
//     });
//   } catch (error) {
//     console.error("❌ Error en registerUser:", error);
//     return res.status(500).json({ error: "Error en el servidor" });
//   }


  
// };


import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source.ts";
import { User } from "../entities/User.ts";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

const userRepository = AppDataSource.getRepository(User);

// // ============================
// // 📌 REGISTRO DE USUARIO
// // ============================
// export const registerUser = async (req: Request, res: Response) => {
//   try {
//     const { name, email, password } = req.body;

//     const existingUser = await userRepository.findOne({ where: { email } });
//     if (existingUser) {
//       return res.status(400).json({ message: "El email ya está registrado" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = userRepository.create({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     await userRepository.save(user);

//     res.status(201).json({ message: "Usuario registrado con éxito", user });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error al registrar el usuario" });
//   }
// };

// // ============================
// // 📌 LOGIN DE USUARIO
// // ============================
// export const loginUser = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;

//     const user = await userRepository.findOne({ where: { email } });
//     if (!user) {
//       return res.status(400).json({ message: "Usuario no encontrado" });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ message: "Contraseña incorrecta" });
//     }

//     const token = jwt.sign(
//       { id: user.id, email: user.email },
//       process.env.JWT_SECRET as string,
//       { expiresIn: "1h" }
//     );

//     res.json({ message: "Login exitoso", token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error en el login" });
//   }
// };

// ============================
// 📌 LISTAR USUARIOS
// ============================
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userRepository.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
  
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await userRepository.findOne({ where: {id: parseInt(req.params.id)},  select: ['id', 'name', 'email'] });
    if (!user) return res.status(404).json({ message: "Error" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener datos del usuario", error });
  }
};

export const getUserByEmail = async (req: Request, res: Response) => {
  try {


    const user = await userRepository.findOne({ where: {email: req.params.email},  select: ['id', 'name', 'email'] });
    if (!user) return res.status(404).json({ message: "Email inexistente" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener datos del usuario", error });
  }
};

export const getUsersWithOrders = async (_req: Request, res: Response) => {
  try {
    const users = await userRepository.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener usuarios con órdenes" });
  }
  
};