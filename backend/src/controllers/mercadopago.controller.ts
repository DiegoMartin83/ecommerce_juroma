// import { Request, Response } from "express";
// import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
// import dotenv from "dotenv";
// import { AppDataSource } from "../config/data-source.js";
// import { Order, OrderStatus } from "../entities/Order.js";
// import { Payment as PaymentEntity } from "../entities/Payment.js";

// dotenv.config();

// const client = new MercadoPagoConfig({
//   accessToken: process.env.MP_ACCESS_TOKEN!,
// });

// /**
//  * ✅ Crear Preferencia de Pago
//  */
// export const createPreference = async (req: Request, res: Response) => {
//   try {
//     const { items, orderId } = req.body;

//     const cleanItems = items.map((item: any) => ({
//       id: String(item.id),
//       title: item.title,
//       quantity: Number(item.quantity),
//       currency_id: "ARS",
//       unit_price: Number(item.unit_price),
//     }));

//     const preference = new Preference(client);

//     const response = await preference.create({
//       body: {
//         items: cleanItems,
//         back_urls: {
//           success: "https://TU-NGROK-ID.ngrok-free.app/api/mercadopago/success",
//           failure: "https://TU-NGROK-ID.ngrok-free.app/api/mercadopago/failure",
//           pending: "https://TU-NGROK-ID.ngrok-free.app/api/mercadopago/pending",
//         },
//         auto_return: "approved",
//         notification_url: "https://TU-NGROK-ID.ngrok-free.app/api/mercadopago/webhook",
//         metadata: { orderId },
//       },
//     });

//     return res.status(200).json({
//       id: response.id,
//       init_point: response.init_point,
//       sandbox_init_point: response.sandbox_init_point,
//     });
//   } catch (error: any) {
//     console.error("❌ Error en createPreference:", error);
//     return res.status(500).json({ error: error.message || "Error desconocido en Mercado Pago" });
//   }
// };

// /**
//  * 📡 Webhook (Notificación de pagos)
//  */
// // export const mercadoPagoWebhook = async (req: Request, res: Response) => {
// //   try {
// //     const data = req.body;
// //     console.log("📩 Webhook recibido:", data);

// //     if (data.type === "payment") {
// //       const payment = new Payment(client);
// //       const paymentInfo = await payment.get({ id: data.data.id });

// //       console.log("✅ Estado del pago:", paymentInfo.status);
// //       console.log("🧾 Order ID recibido:", paymentInfo.metadata.orderId);

// //       // 🔔 Aquí deberías actualizar tu base de datos con el estado del pago

// //       return res.status(200).send("OK");
// //     }

// //     res.status(200).send("Evento ignorado");
// //   } catch (error: any) {
// //     console.error("❌ Error en webhook:", error);
// //     res.status(500).send("Error");
// //   }
// // };

// // /**
// //  * 🔙 Callbacks de prueba
// //  */
// // export const paymentSuccess = (req: Request, res: Response) => {
// //   res.send("✅ Pago aprobado. ¡Gracias por tu compra!");
// // };

// // export const paymentPending = (req: Request, res: Response) => {
// //   res.send("⌛ Pago pendiente. Te avisaremos cuando se confirme.");
// // };

// // export const paymentFailure = (req: Request, res: Response) => {
// //   res.send("❌ El pago no pudo completarse. Intenta nuevamente.");
// // };


// // import { Payment } from "mercadopago";

// export const mercadoPagoWebhook = async (req: Request, res: Response) => {
//   try {
//     const data = req.body;
//     console.log("📩 Webhook recibido:", data);

//     if (data.type === "payment") {
//       const payment = new Payment(client);
//       const paymentInfo = await payment.get({ id: data.data.id });

//       console.log("✅ Estado del pago:", paymentInfo.status);
//       console.log("🧾 Order ID recibido:", paymentInfo.metadata?.orderId);

//       const orderId = paymentInfo.metadata?.orderId;
//       if (!orderId) return res.status(400).send("Sin orderId en metadata");

//       const orderRepo = AppDataSource.getRepository(Order);
//       const paymentRepo = AppDataSource.getRepository(PaymentEntity);

//       const order = await orderRepo.findOneBy({ id: Number(orderId) });
//       if (!order) return res.status(404).send("Orden no encontrada");

//       // 🟡 Actualizamos estado de la orden según estado del pago
//       if (paymentInfo.status === "approved") order.status = OrderStatus.PAID;
//       else if (paymentInfo.status === "rejected") order.status = OrderStatus.CANCELED;
//       else if (paymentInfo.status === "pending") order.status = OrderStatus.PENDING;

//       await orderRepo.save(order);

//       // 💾 Registramos el pago
//       let existingPayment = await paymentRepo.findOneBy({
//         mpPaymentId: paymentInfo.id.toString(),
//       });

//       if (!existingPayment) {
//         existingPayment = new PaymentEntity();
//         existingPayment.mpPaymentId = paymentInfo.id.toString();
//         existingPayment.order = order;
//       }

//       existingPayment.amount = paymentInfo.transaction_amount;
//       existingPayment.status = paymentInfo.status;
//       existingPayment.statusDetail = paymentInfo.status_detail;
//       existingPayment.paymentMethod = paymentInfo.payment_method_id;
//       existingPayment.currencyId = paymentInfo.currency_id;
//       existingPayment.payerEmail = paymentInfo.payer?.email || null;

//       await paymentRepo.save(existingPayment);

//       console.log(`💾 Pago registrado con ID: ${existingPayment.mpPaymentId}`);
//       console.log(`✅ Orden ${orderId} actualizada a estado: ${order.status}`);

//       return res.status(200).send("OK");
//     }

//     res.status(200).send("Evento ignorado");
//   } catch (error: any) {
//     console.error("❌ Error en webhook:", error);
//     res.status(500).send("Error interno");
//   }
// };

import { Request, Response } from "express";
import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import dotenv from "dotenv";
import { AppDataSource } from "../config/data-source.js";
import { Order, OrderStatus } from "../entities/Order.js";
import { Payment as PaymentEntity } from "../entities/Payment.js";

dotenv.config();

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

/**
 * 🧾 Crear preferencia de pago
 */
export const createPreference = async (req: Request, res: Response) => {
  try {
    const { items, orderId } = req.body;

    const cleanItems = items.map((item: any) => ({
      id: String(item.id),
      title: item.title,
      quantity: Number(item.quantity),
      currency_id: "ARS",
      unit_price: Number(item.unit_price),
    }));

    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: cleanItems,
        back_urls: {
          success: "https://TU-NGROK-ID.ngrok-free.app/api/mercadopago/success",
          failure: "https://TU-NGROK-ID.ngrok-free.app/api/mercadopago/failure",
          pending: "https://TU-NGROK-ID.ngrok-free.app/api/mercadopago/pending",
        },
        auto_return: "approved",
        notification_url: "https://TU-NGROK-ID.ngrok-free.app/api/mercadopago/webhook",
        metadata: { orderId },
      },
    });

    return res.status(200).json({
      id: response.id,
      init_point: response.init_point,
      sandbox_init_point: response.sandbox_init_point,
    });
  } catch (error: any) {
    console.error("❌ Error en createPreference:", error);
    return res.status(500).json({
      error: error.message || "Error desconocido al crear preferencia",
    });
  }
};

/**
 * 📡 Webhook (Notificación de pagos de Mercado Pago)
 */
export const mercadoPagoWebhook = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    console.log("📩 Webhook recibido:", data);

    if (data.type === "payment") {
      const payment = new Payment(client);
      const paymentInfo = await payment.get({ id: data.data.id });

      console.log("✅ Estado del pago:", paymentInfo.status);
      console.log("🧾 Order ID recibido:", paymentInfo.metadata?.orderId);

      const orderId = paymentInfo.metadata?.orderId;
      if (!orderId) return res.status(400).send("Falta orderId en metadata");

      const orderRepo = AppDataSource.getRepository(Order);
      const paymentRepo = AppDataSource.getRepository(PaymentEntity);

      const order = await orderRepo.findOneBy({ id: Number(orderId) });
      if (!order) return res.status(404).send("Orden no encontrada");

      // 🟡 Actualizamos el estado de la orden según el pago
      if (paymentInfo.status === "approved") order.status = OrderStatus.PAID;
      else if (paymentInfo.status === "rejected") order.status = OrderStatus.CANCELED;
      else if (paymentInfo.status === "pending") order.status = OrderStatus.PENDING;

      await orderRepo.save(order);

      // 💾 Registramos o actualizamos el pago
      let existingPayment = await paymentRepo.findOneBy({
        mpPaymentId: paymentInfo.id.toString(),
      });

      if (!existingPayment) {
        existingPayment = new PaymentEntity();
        existingPayment.mpPaymentId = paymentInfo.id.toString();
        existingPayment.order = order;
        existingPayment.user = order.user;
      }

      existingPayment.amount = paymentInfo.transaction_amount;
      existingPayment.status = paymentInfo.status;
      existingPayment.statusDetail = paymentInfo.status_detail;
      existingPayment.paymentMethod = paymentInfo.payment_method_id;
      existingPayment.currencyId = paymentInfo.currency_id;
      existingPayment.payerEmail = paymentInfo.payer?.email || null;

      await paymentRepo.save(existingPayment);

      console.log(`💾 Pago registrado con ID: ${existingPayment.mpPaymentId}`);
      console.log(`✅ Orden ${orderId} actualizada a: ${order.status}`);

      return res.status(200).send("OK");
    }

    res.status(200).send("Evento ignorado");
  } catch (error: any) {
    console.error("❌ Error en webhook:", error);
    res.status(500).send("Error interno");
  }
};

/**
 * 🔙 Callbacks de prueba (simulan respuestas del front)
 */
export const paymentSuccess = (req: Request, res: Response) => {
  console.log("🟢 Callback éxito:", req.query);
  res.send("✅ Pago aprobado. ¡Gracias por tu compra!");
};

export const paymentPending = (req: Request, res: Response) => {
  console.log("🟡 Callback pendiente:", req.query);
  res.send("⌛ Tu pago está pendiente de aprobación.");
};

export const paymentFailure = (req: Request, res: Response) => {
  console.log("🔴 Callback fallido:", req.query);
  res.send("❌ El pago no pudo completarse. Intenta nuevamente.");
};
