// src/entities/Cart.ts

// Importamos los decoradores y tipos de TypeORM
// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   ManyToOne,
//   OneToMany,
//   CreateDateColumn,
//   UpdateDateColumn,
// } from "typeorm";

// // Importamos User (el dueño del carrito)
// import { User } from "./User.js";

// // Importamos CartItem (los ítems que contiene este carrito)
// import { CartItem } from "./CartItem.js";

// @Entity("carts") // Nombre de la tabla
// export class Cart {
//   // 🔹 Clave primaria autoincremental
//   @PrimaryGeneratedColumn()
//   id!: number;

//   // 🔹 Relación con el usuario propietario del carrito
//   // Muchos carritos pueden pertenecer a un mismo usuario (si lo deseás así),
//   // pero en la práctica cada usuario tiene uno solo "activo".
//   @ManyToOne(() => User, (user) => user.id, {
//     onDelete: "CASCADE", // Si se borra el usuario, se borra su carrito
//     eager: true, // Carga automáticamente el usuario asociado
//   })
//   user!: User;

//   // 🔹 Relación con los ítems del carrito (CartItem)
//   // Un carrito puede tener varios ítems asociados.
//   @OneToMany(() => CartItem, (item) => item.cartId, {
//     cascade: true, // Permite que se guarden/borran ítems junto con el carrito
//   })
//   items!: CartItem[];

//   // 🔹 Fecha de creación del carrito
//   @CreateDateColumn()
//   createdAt!: Date;

//   // 🔹 Fecha de última actualización
//   @UpdateDateColumn()
//   updatedAt!: Date;
// }

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

/*
  Esta entidad representa un carrito de compras (Cart)
  asociado a un usuario a través de un userId numérico simple.
*/
@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id!: number;

  // ID del usuario dueño del carrito (sin relación)
  @Column()
  userId!: number;

  // Array de items (guardado como JSON en la base de datos)
  @Column("simple-json", { nullable: true })
  items!: {
    productId: number;
    name: string;
    price: number;
    quantity: number;
  }[];

  // Fecha de creación automática
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
}
