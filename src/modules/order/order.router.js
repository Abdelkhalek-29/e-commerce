import { Router } from "express";
import { isAuthenticated } from "../../middleware/authuntication.middleware.js";
import { createOrderSchema, cancelOrderSchema } from "./order.validation.js";
import { createOrder, cancelOrder ,orderWebhock } from "./order.controller.js";
import { isValid } from "../../middleware/validation.middleware.js";
import express  from 'express'

const router = Router();

// create order
router.post("/", isAuthenticated, isValid(createOrderSchema), createOrder);

// cancel order
router.patch(
  "/:orderId",
  isAuthenticated,
  isValid(cancelOrderSchema),
  cancelOrder
);
export default router;

// webhock

router.post("/webhook", express.raw({ type: "application/json" }),orderWebhock);
