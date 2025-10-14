// import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// @Entity()
// export class Product {
//   @PrimaryGeneratedColumn()
//   id!: number;

//   @Column() 
//   name!: string;

//   @Column("decimal", { precision: 10, scale: 2 })
//   price!: number;

//   @Column()
//   stock!: number;
// }

// import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";


// @Entity("products")
// export class Product {
//   @PrimaryGeneratedColumn()
//   id!: number;

//   // @Column()
//   // name!: string;
//    @Column({ type: "varchar", length: 100 })
//   name!: string;

//   @Column("text")
//   description!: string;

//   @Column("decimal", { precision: 10, scale: 2 })
//   price!: number;

//   @Column("int")
//   stock!: number;

//   @Column()
//   category!: string;

//   @CreateDateColumn()
//   createdAt!: Date;

//   @UpdateDateColumn()
//   updatedAt!: Date;

//   @OneToMany(() => require("./CartItem.js").CartItem, (item: any) => item.product)
//   cartItems!: any[];
// }

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({name: "product_name", type: "varchar", length: 150 })
  product_name!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price!: number;

  @Column({ type: "int", default: 0 })
  stock!: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  imageUrl?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
