
// import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
// import { Cart } from "./Cart.js";

// @Entity("users")
// export class User {
//   @PrimaryGeneratedColumn()
//   id!: number;

//   @Column({ name: "user_name", type: "varchar", length: 100 })
//   user_name!: string;

//   @Column({ type: "varchar", unique: true })
//   email!: string;

//   @Column({ type: "varchar" })
//   password!: string;

//   @OneToMany(() => Cart, (cart) => cart.user)
//   carts!: Cart[];
// }

// src/entities/User.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Cart } from "./Cart.js";
import { Order } from "./Order.js";
  import { Payment } from "./Payment.js";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

 @Column({ name: "user_name", type: "varchar", length: 100, nullable: true })
 user_name!: string;

  @Column({type: "varchar", length: 150 })
  email!: string;

  @Column({type: "varchar", length: 255})
  password!: string;

  @OneToMany(() => Cart, (cart) => cart.user)
  carts!: Cart[];

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];

@OneToMany(() => Payment, (payment) => payment.user)
payments!: Payment[];

}
