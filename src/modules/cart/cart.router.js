import { Router } from "express";
import { isAuthenticated } from "./../../middleware/authuntication.middleware.js";
import { isValid } from "./../../middleware/validation.middleware.js";
import { cartSchema, removeProductFromCartSchema } from "./cart.validation.js";
import {
  addToCart,
  userCart,
  updateCart,
  removeProductFromCart,
  clearCart,
} from "./cart.controller.js";

const router = Router();

// CRUD
// add product to cart
router.post("/", isAuthenticated, isValid(cartSchema), addToCart);

//user Cart
router.get("/", isAuthenticated, userCart);

// update cart
router.patch("/", isAuthenticated, isValid(cartSchema), updateCart);

// clear cart
router.put("/clear", isAuthenticated, clearCart);

// remove product from cart
router.patch(
  "/:productId",
  isAuthenticated,
  isValid(removeProductFromCartSchema),
  removeProductFromCart
);

export default router;
