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

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";


@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column("text")
  description!: string;

  @Column("decimal", { precision: 10, scale: 2 })
  price!: number;

  @Column("int")
  stock!: number;

  @Column()
  category!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

}

