// import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

// // 👇 Esto indica que esta clase representa una tabla en la DB
// @Entity("users")
// export class User {
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

// // Relación con Orders
//   @OneToMany(() => Order, (order) => order.user)
//   orders!: Order[];
  
// }

// src/entities/User.ts

// src/entities/User.ts

// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column
// } from "typeorm";

// @Entity()
// export class User {
//   @PrimaryGeneratedColumn()
//   id!: number;

//   @Column()
//   name!: string;

//   @Column({ unique: true })
//   email!: string;

//   @Column()
//   password!: string;

//   @Column({ default: false })
//   isAdmin!: boolean;

//   // Relación con Order eliminada para evitar referencia circular
// }

// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   OneToMany,
// } from "typeorm";

// import type { Order } from "./Order.js";

// @Entity()
// export class User {
//   @PrimaryGeneratedColumn()
//   id!: number;

//   @Column()
//   name!: string;

//   @Column({ unique: true })
//   email!: string;

//   @Column()
//   password!: string;

//   @Column({ default: false })
//   isAdmin!: boolean;

//   @OneToMany(() => Order, (order) => order.user)
//   orders!: Order[];
// }


  
  import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
  // import { Cart } from "./Cart.js";
  
  @Entity("users") 
export class User { 
  @PrimaryGeneratedColumn() 
  id!: number; 
  
  @Column() 
  name!: string; 
  
  @Column({ unique: true }) 
  email!: string; 
  
  @Column()
  password!: string; 
  
  @Column({ default: false }) 
  isAdmin!: boolean;

  // @Column({ type:"enum",
  //   enum: ["DNI", "LE", "LC", "PASAPORTE"],
  //   default:"Sin Especificar",
  //   nullable: true
  //  })
  // tipoDocumento!: string; 

  @Column({ nullable: true })
  dni!: string;

//   @OneToMany(() => Cart, (cart) => cart.user)
// carts!: Cart[];


  @Column({
  type: "enum",
  enum: ["Masculino", "Femenino", "Sin Especificar"],
  default: "Sin Especificar",
  nullable: true
})
genero!: "Masculino" | "Femenino" | "Sin Especificar";


}// @ManyToOne(() => User, (user) => (user as any).orders, { eager: true }) // user!: User; @ManyToOne(() => User as any, (user: any) => user.orders, { eager: true }) user!: User; @Column("decimal", { precision: 10, scale: 2 }) total!: number; @Column({ type: "enum", enum: OrderStatus, default: OrderStatus.PENDING, }) status!: OrderStatus; @CreateDateColumn() createdAt!: Date; @UpdateDateColumn() updatedAt!: Date; }