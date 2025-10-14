
// import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// /*
//   Esta entidad representa un carrito de compras (Cart)
//   asociado a un usuario a través de un userId numérico simple.
// */
// @Entity()
// export class Cart {
//   @PrimaryGeneratedColumn()
//   id!: number;

//   // ID del usuario dueño del carrito (sin relación)
//   @Column()
//   userId!: number;

//   // Array de items (guardado como JSON en la base de datos)
//   @Column("simple-json", { nullable: true })
//   items!: {
//     productId: number;
//     name: string;
//     price: number;
//     quantity: number;
//   }[];

//   // Fecha de creación automática
//   @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
//   createdAt!: Date;

  
// }
// import {
//   Entity,
//   Column,
//   PrimaryGeneratedColumn,
//   ManyToOne,
//   OneToMany,
//   CreateDateColumn,
//   UpdateDateColumn,
// } from "typeorm";
// import { User } from "./User.js";

// @Entity("carts")
// export class Cart {
//   @PrimaryGeneratedColumn()
//   id!: number;

//   // 🔹 Relación con usuario
//   @ManyToOne(() => User, (user:any) => user.carts, {
//     onDelete: "CASCADE",
//   })
//   user!: User;

//   // 🔹 Relación con ítems del carrito
//   // Usamos `require()` para evitar import circular directo
//   @OneToMany(() => require("./CartItem.js").CartItem, (item: any) => item.cart, {
//     cascade: true,
//   })
//   items!: any[];

//   @CreateDateColumn()
//   createdAt!: Date;

//   @UpdateDateColumn()
//   updatedAt!: Date;
// }

import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User.js";
import { CartItem } from "./CartItem.js";

@Entity("carts")
export class Cart {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.carts, { onDelete: "CASCADE" })
  user!: User;

  @OneToMany(() => CartItem, (item) => item.cart, { cascade: true })
  items!: CartItem[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
