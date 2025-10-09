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

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

/*
  Entidad auxiliar para representar un ítem dentro del carrito.
  No tiene relaciones directas ni claves foráneas.
*/
@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id!: number;

  // ID del producto asociado
  @Column()
  productId!: number;

  // Nombre del producto
  @Column()
  name!: string;

  // Precio unitario
  @Column("decimal", { precision: 10, scale: 2 })
  price!: number;

  // Cantidad elegida
  @Column()
  quantity!: number;
}
