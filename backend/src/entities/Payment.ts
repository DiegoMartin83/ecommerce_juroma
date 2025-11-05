// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToOne,
//   CreateDateColumn,
//   UpdateDateColumn,
// } from "typeorm";
// import { Order } from "./Order.js";

// @Entity("payments")
// export class Payment {
//   @PrimaryGeneratedColumn()
//   id!: number;

//   @Column({ unique: true })
//   mpPaymentId!: string; // ID del pago en Mercado Pago

//   @ManyToOne(() => Order, (order) => order.id, { onDelete: "CASCADE" })
//   order!: Order;

//   @Column("decimal", { precision: 10, scale: 2, nullable: true })
//   amount!: number;

//   @Column({ nullable: true })
//   status!: string; // approved, pending, rejected...

//   @Column({ nullable: true })
//   statusDetail!: string; // status_detail de MP

//   @Column({ nullable: true })
//   paymentMethod!: string; // tarjeta, débito, efectivo, etc.

//   @Column({ nullable: true })
//   currencyId!: string; // ARS, USD...

//   @Column({ nullable: true })
//   payerEmail!: string;

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
// import { Order } from "./Order.js";
// import { User } from "./User.js";

// @Entity("payments")
// export class Payment {
//   @PrimaryGeneratedColumn()
//   id!: number;

//   // ID del pago en Mercado Pago
//   @Column()
//   mpPaymentId!: string;

//   // Relación con la orden
//   @ManyToOne(() => Order, (order) => order.id, { onDelete: "CASCADE", eager: true })
//   order!: Order;

//   // Relación con el usuario que realizó el pago
//   @ManyToOne(() => User, { eager: true })
//   user!: User;

//   // Monto total pagado
//   @Column("decimal", { precision: 10, scale: 2 })
//   amount!: number;

//   // Estado del pago (approved, rejected, pending, etc.)
//   @Column()
//   status!: string;

//   // Detalle adicional del estado (por ejemplo, "accredited", "cc_rejected_other_reason")
//   @Column({ nullable: true })
//   statusDetail?: string;

//   // Método de pago (credit_card, pix, etc.)
//   @Column({ nullable: true })
//   paymentMethod?: string;

//   // Moneda (ARS, USD, etc.)
//   @Column({ nullable: true })
//   currencyId?: string;

//   // Email del pagador (si viene en la metadata de MP)
//   @Column({ nullable: true })
//   payerEmail?: string;

//   @CreateDateColumn()
//   createdAt!: Date;

//   @UpdateDateColumn()
//   updatedAt!: Date;
// }

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { Order } from "./Order.js";
import { User } from "./User.js";

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", nullable: false })
  mpPaymentId!: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  amount!: number;

  @Column({ type: "varchar", nullable: false })
  status!: string;

  @Column({ type: "varchar", nullable: true })
  statusDetail!: string;

  @Column({ type: "varchar", nullable: true })
  paymentMethod!: string;

  @Column({ type: "varchar", nullable: true })
  currencyId!: string;

  @Column({ type: "varchar", nullable: true })
  payerEmail!: string;

  @ManyToOne(() => Order, (order) => order.payments, { eager: true })
  order!: Order;

  @ManyToOne(() => User, (user) => user.payments, { nullable: true, eager: true })
  user!: User | null;

  @CreateDateColumn()
  createdAt!: Date;
}
