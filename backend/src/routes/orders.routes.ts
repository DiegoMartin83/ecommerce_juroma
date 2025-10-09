// routes/orderRoutes.ts
import express from "express";
import { getOrdersByUser } from "../controllers/orders.controller.js";

const router = express.Router();

router.get("/user/:id", getOrdersByUser);

export default router;
