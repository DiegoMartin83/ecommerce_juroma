

// src/routes/mercadopago.routes.ts
// import express from "express";
// import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
// import { AppDataSource } from "../config/data-source.js";
// import { Order } from "../entities/Order.js";
// import dotenv from "dotenv";

// dotenv.config();
// const router = express.Router();

// // ----------------------
// // Inicializar SDK MP
// // ----------------------
// const client = new MercadoPagoConfig({
//   accessToken: process.env.MP_ACCESS_TOKEN!, // debe existir en .env
// });

// // ----------------------
// // Crear preferencia (desde una orden ya creada en DB)
// // POST /api/mercadopago/create_preference
// // Body recomendado: { "orderId": 2 }
// // ----------------------
// router.post("/create_preference", async (req, res) => {
//   try {
//     const { orderId } = req.body;
//     if (!orderId) return res.status(400).json({ message: "Falta orderId" });

//     // Traer orden de la DB (con items y productos)
//     const orderRepo = AppDataSource.getRepository(Order);
//     const order = await orderRepo.findOne({
//       where: { id: Number(orderId) },
//       relations: ["items", "items.product"],
//     });
//     if (!order) return res.status(404).json({ message: "Orden no encontrada" });

//     // Construir items para MercadoPago (asegurando tipos)
//     const mpItems = order.items.map((it: any, idx: number) => ({
//       id: String(idx + 1),
//       title: it.product.product_name || it.product.name || "Producto",
//       quantity: Number(it.quantity),
//       currency_id: "ARS",
//       unit_price: Number(it.priceAtPurchase ?? it.priceAtAdd ?? it.product.price),
//     }));

//     console.log("Items enviados a MP:", mpItems);

//     const preference = new Preference(client);

//     // notification_url: URL pública (ngrok) que va a recibir los webhooks
//     // Recomendado: guardá NGROK_URL en .env como https://mi-id.ngrok-free.app
//     const notificationUrl = process.env.NGROK_URL
//       ? `${process.env.NGROK_URL.replace(/\/$/, "")}/api/mercadopago/webhook`
//       : "https://TU-NGROK-ID.ngrok-free.app/api/mercadopago/webhook";

//     const response = await preference.create({
//       body: {
//         items: mpItems,
//         back_urls: {
//           success: process.env.BACK_URL_SUCCESS || "http://localhost:4200/success",
//           failure: process.env.BACK_URL_FAILURE || "http://localhost:4200/failure",
//           pending: process.env.BACK_URL_PENDING || "http://localhost:4200/pending",
//         },
//         // auto_return puede ser 'approved' (si querés auto-return) o '' si no
//         auto_return: "approved",
//         notification_url: notificationUrl,        // <-- aquí va la webhook public URL
//         metadata: { orderId: order.id },          // <-- metadata con orderId para luego mapear
//       },
//     });

//     // response contiene init_point e id entre otras cosas
//     return res.status(200).json({
//       id: response.id,
//       init_point: response.init_point,
//       sandbox_init_point: response.sandbox_init_point,
//       api_response: response.api_response,
//     });
//   } catch (error: any) {
//     console.error("❌ Error en create_preference:", error);
//     return res.status(500).json({ error: error.message || "Error desconocido" });
//   }
// });

// // ----------------------
// // Webhook: Mercado Pago nos llama aquí
// // POST /api/mercadopago/webhook
// // ----------------------
// router.post("/webhook", async (req, res) => {
//   try {
//     console.log("📩 Webhook recibido:", JSON.stringify(req.body).slice(0, 1000));

//     const { type, data } = req.body;

//     // Solo manejamos pagos
//     if (type === "payment" || type === "payment.updated") {
//       const payment = new Payment(client);
//       // data.id es el id del pago enviado por MP en el webhook
//       const paymentInfo: any = await payment.get({ id: data.id });

//       console.log("🔍 paymentInfo.status:", paymentInfo.status);
//       console.log("🔍 paymentInfo.metadata:", paymentInfo.metadata);

//       const orderId = paymentInfo.metadata?.orderId;
//       if (!orderId) {
//         console.warn("⚠ No se encontró orderId en metadata del pago");
//         return res.status(400).send("Falta orderId en metadata");
//       }

//       // Actualizar orden en DB según estado
//       const orderRepo = AppDataSource.getRepository(Order);
//       const order = await orderRepo.findOne({ where: { id: Number(orderId) } });
//       if (!order) {
//         console.warn("⚠ Orden no encontrada:", orderId);
//         return res.status(404).send("Orden no encontrada");
//       }

//       // Mapear estados MP -> OrderStatus de tu app
//       // Ajustá los nombres a los que usás en tu enum si es necesario
//       const mpStatus = paymentInfo.status; // e.g. "approved", "in_process", "rejected"
//       let newStatus = "PENDING";
//       if (mpStatus === "approved") newStatus = "COMPLETED";
//       else if (mpStatus === "in_process" || mpStatus === "pending") newStatus = "PENDING";
//       else if (mpStatus === "rejected" || mpStatus === "cancelled") newStatus = "CANCELED";

//       order.status = newStatus as any; // casteo por seguridad según tu OrderStatus
//       await orderRepo.save(order);

//       console.log(`✅ Orden ${orderId} actualizada a: ${newStatus}`);
//       return res.status(200).send("OK");
//     }

//     // Otros eventos que no manejamos
//     res.status(200).send("Evento recibido");
//   } catch (error: any) {
//     console.error("❌ Error en webhook:", error);
//     res.status(500).send("Error interno");
//   }
// });

// // ----------------------
// // Rutas de prueba/back_urls (opcional)
// // GET /api/mercadopago/success  etc.
// // ----------------------
// router.get("/success", (_req, res) => res.send("✅ Pago aprobado - back_url success"));
// router.get("/pending", (_req, res) => res.send("⌛ Pago pendiente - back_url pending"));
// router.get("/failure", (_req, res) => res.send("❌ Pago fallido - back_url failure"));

// export default router;


import { Router } from "express";
import {
  createPreference,
  mercadoPagoWebhook,
  paymentSuccess,
  paymentPending,
  paymentFailure,
} from "../controllers/mercadopago.controller.js";

const router = Router();

router.post("/create_preference", createPreference);
router.post("/webhook", mercadoPagoWebhook);
router.get("/success", paymentSuccess);
router.get("/pending", paymentPending);
router.get("/failure", paymentFailure);

export default router;
