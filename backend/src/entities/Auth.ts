// import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// // 👇 Esto indica que esta clase representa una tabla en la DB
// @Entity("users")
// export class Auth {
//   // PrimaryGeneratedColumn = autoincremental (1, 2, 3, ...)
//   @PrimaryGeneratedColumn()
//   id!: number;

//   // Columna normal (texto)
//   @Column()
//   name!: string;

//   // Columna única (no puede repetirse el email en la tabla)
//   @Column({ unique: true })
//   email!: string;

//   // Columna normal para la contraseña (pero se guardará encriptada)
//   @Column()
//   password!: string;
// }

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User.js";

@Entity("auth")
export class Auth {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  user!: User;

  @Column({ type: "varchar", length: 255 })
  token!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
