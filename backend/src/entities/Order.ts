// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToOne,
//   CreateDateColumn,
//   UpdateDateColumn
// } from "typeorm";
// import { User } from "./User.ts";

// export enum OrderStatus {
//   PENDING = "PENDING",
//   PAID = "PAID",
//   SHIPPED = "SHIPPED",
//   COMPLETED = "COMPLETED",
//   CANCELED = "CANCELED",
// }

// @Entity()
// export class Order {
//   @PrimaryGeneratedColumn()
//   id!: number;

//   @ManyToOne(() => User, (user) => user.orders, { eager: true })
//   user!: User;

//   @Column("decimal", { precision: 10, scale: 2 })
//   total!: number;

//   @Column({
//     type: "enum",
//     enum: OrderStatus,
//     default: OrderStatus.PENDING,
//   })
//   status!: OrderStatus;

//   @CreateDateColumn()
//   createdAt!: Date;

//   @UpdateDateColumn()
//   updatedAt!: Date;
// }

// src/entities/Order.ts

// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToOne,
//   CreateDateColumn,
//   UpdateDateColumn,
// } from "typeorm";
// import { User } from "./User.js";

// export enum OrderStatus {
//   PENDING = "PENDING",
//   PAID = "PAID",
//   SHIPPED = "SHIPPED",
//   COMPLETED = "COMPLETED",
//   CANCELED = "CANCELED",
// }

// @Entity()
// export class Order {
//   @PrimaryGeneratedColumn()
//   id!: number;

//   // @ManyToOne(() => User, (user) => (user as any).orders, { eager: true })
//   // user!: User;

//   @ManyToOne(() => User as any, (user: any) => user.orders, { eager: true })
// user!: User;

//   @Column("decimal", { precision: 10, scale: 2 })
//   total!: number;

//   @Column({
//     type: "enum",
//     enum: OrderStatus,
//     default: OrderStatus.PENDING,
//   })
//   status!: OrderStatus;

//   @CreateDateColumn()
//   createdAt!: Date;

//   @UpdateDateColumn()
//   updatedAt!: Date;
// }

// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToOne,
//   CreateDateColumn,
//   UpdateDateColumn,
// } from "typeorm";

// // 👇 Esto solo le da a TS el tipo, no importa nada en runtime
// import type { User } from "./User.js";

// export enum OrderStatus {
//   PENDING = "PENDING",
//   PAID = "PAID",
//   SHIPPED = "SHIPPED",
//   COMPLETED = "COMPLETED",
//   CANCELED = "CANCELED",
// }

// @Entity()
// export class Order {
//   @PrimaryGeneratedColumn()
//   id!: number;

//   @ManyToOne(
//     () => require("./User.js").User, // runtime: resuelve la clase sin circularidad
//     (user: User) => user.orders,     // TS ya entiende que es User
//     { eager: true }
//   )
//   user!: User; // ✅ ahora no es "unknown", es User

//   @Column("decimal", { precision: 10, scale: 2 })
//   total!: number;

//   @Column({
//     type: "enum",
//     enum: OrderStatus,
//     default: OrderStatus.PENDING,
//   })
//   status!: OrderStatus;

//   @CreateDateColumn()
//   createdAt!: Date;

//   @UpdateDateColumn()
//   updatedAt!: Date;
// }

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, } 
from "typeorm"; 
import { User } from "./User.js"; 
export enum OrderStatus { 
  PENDING = "PENDING", 
  PAID = "PAID", 
  SHIPPED = "SHIPPED", 
  COMPLETED = "COMPLETED", 
  CANCELED = "CANCELED", } 
  @Entity() export class Order { 
    @PrimaryGeneratedColumn() 
    id!: number;

    @ManyToOne(() => User, (user) => user.id, { eager: true })
user!: User;
  }