import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Order } from "./Order.js";
import { Product } from "./Product.js";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: "CASCADE" })
  order!: Order;

  @ManyToOne(() => Product, { eager: true })
  product!: Product;

  @Column({type: "int"})
  quantity!: number;

  @Column("decimal", { precision: 10, scale: 2 })
  priceAtPurchase!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
