// src/entities/CartItem.ts

// Importamos los decoradores y tipos de TypeORM
// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToOne,
//   CreateDateColumn,
//   UpdateDateColumn,
// } from "typeorm";

// // Importamos el producto al que hace referencia cada ítem
// import { Product } from "./Product.js";

// @Entity("cart_items") // Nombre de la tabla
// export class CartItem {
//   // 🔹 Clave primaria autoincremental
//   @PrimaryGeneratedColumn()
//   id!: number;

//   // 🔹 ID del carrito al que pertenece este ítem
//   // En vez de importar la entidad Cart (para evitar el bucle circular),
//   // usamos solo su ID como referencia.
//   @Column()
//   cartId!: number;

//   // 🔹 Relación con el producto
//   // Varios ítems pueden hacer referencia al mismo producto.
//   @ManyToOne(() => Product, { eager: true }) // eager = carga automática
//   product!: Product;

//   // 🔹 Cantidad de unidades del producto
//   @Column("int")
//   quantity!: number;

//   // 🔹 Precio del producto en el momento de añadirlo al carrito
//   // (por si después cambia en la tabla de productos)
//   @Column("decimal", { precision: 10, scale: 2 })
//   price!: number;

//   // 🔹 Fecha de creación del ítem
//   @CreateDateColumn()
//   createdAt!: Date;

//   // 🔹 Fecha de última modificación del ítem
//   @UpdateDateColumn()
//   updatedAt!: Date;
// }

// import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// /*
//   Entidad auxiliar para representar un ítem dentro del carrito.
//   No tiene relaciones directas ni claves foráneas.
// */
// @Entity()
// export class CartItem {
//   @PrimaryGeneratedColumn()
//   id!: number;

//   // ID del producto asociado
//   @Column()
//   productId!: number;

//   // Nombre del producto
//   @Column()
//   name!: string;

//   // Precio unitario
//   @Column("decimal", { precision: 10, scale: 2 })
//   price!: number;

//   // Cantidad elegida
//   @Column()
//   quantity!: number;
// }

// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToOne,
// } from "typeorm";

// @Entity("cart_items")
// export class CartItem {
//   @PrimaryGeneratedColumn()
//   id!: number;

//   // 🔹 Relación con carrito (muchos items -> un carrito)
//   @ManyToOne(() => require("./Cart.js").Cart, (cart: any) => cart.items, {
//     onDelete: "CASCADE",
//   })
//   cart!: any;

//   // 🔹 Relación con producto (opcional: puede ser null si el producto se elimina)
//   @ManyToOne(() => require("./Product.js").Product, {
//     nullable: true,
//     onDelete: "SET NULL",
//   })
//   product!: any;

//   @Column("int")
//   quantity!: number;

//   @Column("decimal", { precision: 10, scale: 2 })
//   priceAtAdd!: number; // precio del producto al momento de agregarlo
// }

import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn
} from "typeorm";
import { Cart } from "./Cart.js";
import { Product } from "./Product.js";

@Entity("cart_items")
export class CartItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Cart, (cart) => cart.items, { onDelete: "CASCADE" })
  cart!: Cart;

 @ManyToOne(() => Product, { onDelete: "CASCADE" }) // 👈 ACA
  @JoinColumn({ name: "product_id" })
  product:any;

  @Column({ type: "int" })
  quantity!: number;

  // 🔹 nuevo campo — guarda el precio del producto al momento de agregarlo
  @Column({ type: "decimal", precision: 10, scale: 2,  nullable: true })
  priceAtAdd!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
