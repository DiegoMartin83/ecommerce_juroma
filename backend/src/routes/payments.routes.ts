// import { Router } from 'express';
// import { createPayment, handleWebhooks } from '../controllers/payments.controller.js';

// const router = Router();

// router.post('/create-order/:orderId', createPayment);
// router.post('/webhook', handleWebhooks);
// router.get("/:orderId", getPaymentsByOrder);

// export default router;

import { Router } from "express";
import { getPaymentsByOrder } from "../controllers/payments.controller.js";

const router = Router();

router.get("/:orderId", getPaymentsByOrder);

export default router;


