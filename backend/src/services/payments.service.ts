// import mercadopago from "mercadopago";
// import { Order } from "../entities/Order.js";
// import { AppDataSource } from "../config/data-source.js";

// mercadopago.configure({
//   access_token: process.env.MP_ACCESS_TOKEN || "", // ⚠️ Colocá tu token de prueba aquí en .env
// });

// export const createPaymentPreference = async (orderId: number) => {
//   const orderRepo = AppDataSource.getRepository(Order);
//   const order = await orderRepo.findOne({
//     where: { id: orderId },
//     relations: ["user", "cart", "cart.items", "cart.items.product"],
//   });

//   if (!order) throw new Error("Orden no encontrada");

//   const items = order.items.map((item) => ({
//     title: item.product.product_name,
//     unit_price: item.product.price,
//     quantity: item.quantity,
//     currency_id: "ARS",
//   }));

//   const preference = {
//     items,
//     payer: {
//       email: order.user.email,
//     },
//     back_urls: {
//       success: "http://localhost:4200/success", // Angular - éxito
//       failure: "http://localhost:4200/failure",
//       pending: "http://localhost:4200/pending",
//     },
//     auto_return: "approved",
//     notification_url: "http://localhost:4000/api/payments/webhook", // donde MercadoPago enviará el estado real
//     external_reference: String(order.id),
//   };

//   const result = await mercadopago.preferences.create(preference);
//   return result.body;
// };

// import { Preference } from 'mercadopago';
// import { AppDataSource } from '../config/data-source.js';
// import { Order } from '../entities/Order.js';
// import dotenv from 'dotenv';

// dotenv.config();

// export const createPaymentService = async (orderId: number) => {
//   const orderRepo = AppDataSource.getRepository(Order);

//   // Obtenemos la orden de la base
//   const order = await orderRepo.findOne({
//     where: { id: orderId },
//     relations: ['items', 'items.product'],
//   });

//   if (!order) throw new Error('Orden no encontrada');

//   // 🔍 Verificamos que el access token está bien cargado
//   console.log('MP_ACCESS_TOKEN desde .env:', process.env.MP_ACCESS_TOKEN);

//   // Inicializamos Mercado Pago con el token del .env
//   const preference = new Preference({ accessToken: process.env.MP_ACCESS_TOKEN! });

//   // Creamos la preferencia con los productos de la orden
//   console.log(order.items.map((item: any) => ({
//   id: "id interno",
//   title: item.product.product_name,
//   quantity: item.quantity,
//   currency_id: 'ARS',
//   unit_price: item.product.price,
// })));

//   const result = await preference.create({
//     body: {
//       items: order.items.map((item: any, index: number) => ({
//         id: String(index + 1),
//         title: item.product.product_name,
//         quantity: item.quantity,
//         currency_id: 'ARS',
//         unit_price: Number(item.product.price),
//       })),
//       back_urls: {
//         success: 'http://localhost:4200/success',
//         failure: 'http://localhost:4200/failure',
//         pending: 'http://localhost:4200/pending'
//       },
//       auto_return: 'approved',
//       metadata: { orderId: order.id },
//     },
//   });

//   return result;
// };
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { AppDataSource } from '../config/data-source.js';
import { Order } from '../entities/Order.js';
import dotenv from 'dotenv';

dotenv.config();

export const createPaymentService = async (orderId: number) => {
  const orderRepo = AppDataSource.getRepository(Order);

  const order = await orderRepo.findOne({
    where: { id: orderId },
    relations: ['items', 'items.product'],
  });

  if (!order) throw new Error('Orden no encontrada');

  // ✅ Inicializamos Mercado Pago con la forma correcta del nuevo SDK
  const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN!,
  });

  const preference = new Preference(client);

  // ✅ Aseguramos que el precio es número
  const items = order.items.map((item: any, index: number) => ({
    id: String(index + 1),
    title: item.product.product_name,
    quantity: Number(item.quantity),
    currency_id: 'ARS',
    unit_price: Number(item.product.price),
  }));

  console.log("Items enviados a MP:", items); // para verificar

  const result = await preference.create({
    body: {
      items,
      back_urls: {
        success: 'http://localhost:4200/success',
        failure: 'http://localhost:4200/failure',
        pending: 'http://localhost:4200/pending',
      },
      //auto_return: 'approved',
      metadata: { orderId: order.id },
    },
  });

  return result;
};
