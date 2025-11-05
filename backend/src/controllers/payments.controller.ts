

// import { Request, Response } from 'express';
// import { createPaymentService } from '../services/payments.service.js';
// import { AppDataSource } from '../config/data-source.js';
// import { Order, OrderStatus } from '../entities/Order.js';

// // Crear la preferencia de pago
// export const createPayment = async (req: Request, res: Response) => {
//   try {
//     const { orderId } = req.params;
//     const result = await createPaymentService(Number(orderId));
//     res.status(200).json(result);
//   } catch (error) {
//     console.error('Error creando preferencia de pago:', error);
//     res.status(500).json({ error: 'Error creando preferencia de pago' });
//   }
// };

// // Webhook para recibir notificaciones de Mercado Pago
// export const handleWebhooks = async (req: Request, res: Response) => {
//   try {
//     const { type, data } = req.body;

//     if (type === 'payment' && data?.id) {
//       const paymentId = data.id;
//       console.log(`🔔 Notificación de pago recibida: ${paymentId}`);

//       // Buscar la orden asociada (si guardás metadata.orderId podés buscarla así)
//       const orderRepo = AppDataSource.getRepository(Order);
//       const order = await orderRepo.findOne({
//         where: { id: Number(req.body.metadata?.orderId) },
//       });

//       if (order) {
//         order.status = OrderStatus.COMPLETED;// o el estado que quieras asignar al pago aprobado
//         await orderRepo.save(order);
//         console.log(`✅ Orden ${order.id} actualizada como COMPLETED`);
//       }
//     }

//     res.status(200).json({ message: 'Webhook recibido correctamente' });
//   } catch (error) {
//     console.error('Error en webhook:', error);
//     res.status(500).json({ error: 'Error procesando webhook' });
//   }
// };


import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source.js";
import { Order } from "../entities/Order.js";
import { Payment } from "../entities/Payment.js";

// 🔹 Obtener pagos por orden
export const getPaymentsByOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    const paymentRepo = AppDataSource.getRepository(Payment);
    const payments = await paymentRepo.find({
      where: { order: { id: Number(orderId) } },
      relations: ["order", "user"],
    });

    if (!payments.length) {
      return res.status(404).json({ message: "No se encontraron pagos para esta orden" });
    }

    res.status(200).json(payments);
  } catch (error) {
    console.error("Error obteniendo pagos por orden:", error);
    res.status(500).json({ error: "Error obteniendo pagos" });
  }
};
