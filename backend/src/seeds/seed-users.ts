import { AppDataSource } from "../config/data-source.js";
import { User } from "../entities/User.js";

export const seedUsers = async () => {
  const userRepo = AppDataSource.getRepository(User);

  const existing = await userRepo.count();
  if (existing > 0) {
    console.log("👤 Usuarios ya existen, saltando seed.");
    return;
  }

  const users = userRepo.create([
    {
      user_name: "diego",
      email: "diego@example.com",
      password: "123456",
    },
    {
      user_name: "maria",
      email: "maria@example.com",
      password: "123456",
    },
  ]);

  await userRepo.save(users);
  console.log("✅ Usuarios creados correctamente");
};
