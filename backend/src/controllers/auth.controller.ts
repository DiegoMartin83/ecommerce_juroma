import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source.ts";
import { User } from "../entities/User.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userRepository = AppDataSource.getRepository(User);

// ============================
// 📌 REGISTRO DE USUARIO
// ============================
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    res.status(201).json({ message: "Usuario registrado con éxito", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
};

// ============================
// 📌 LOGIN DE USUARIO
// ============================
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login exitoso", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el login" });
  }
};

// // ============================
// // 📌 LISTAR USUARIOS
// // ============================
// export const getUsers = async (_req: Request, res: Response) => {
//   try {
//     const users = await userRepository.find();
//     res.json(users);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error al obtener usuarios" });
//   }
// };

// ================
// 📌 VER PERFIL
// ================

export const getProfile = async (req: Request, res: Response) => {
  try {
    const profile = await userRepository.findOne({ where: {id: parseInt(req.params.id)},  select: ['id', 'name', 'email'] });
    if (!profile) return res.status(404).json({ message: "Error" });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el perfil", error });
  }
};


//===============================
//  Actualizar perfil de usuario
//===============================
export const updateProfile = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const { name, email, password } = req.body;

  try {
    // Traer el usuario con la contraseña incluida
    const user = await userRepository.findOne({
    
      where: { id: userId },
      select: ['id', 'name', 'email', 'password'],
      
    });
      console.log(user)
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    // Verificar contraseña actual
    console.log("Password en DB:", user.password); // debería ser el hash
console.log("Password ingresada:", password); // debería ser la real (no hasheada)

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña actual incorrecta' });
    }

    // Actualizar campos permitidos
    if (name) user.name = name;
    if (email) user.email = email;

    await userRepository.save(user);

    res.json({ message: 'Perfil actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el perfil', error });
    console.log(req.body);
  }
};
