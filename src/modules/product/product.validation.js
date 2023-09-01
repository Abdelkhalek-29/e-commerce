import joi from "joi";
import { isValidObjectId } from "../../middleware/validation.middleware.js";

// create product
export const createProductschema = joi
  .object({
    name: joi.string().required().min(2).max(20),
    description: joi.string(),
    availableItems: joi.number().min(1).required(),
    price: joi.number().min(1).required(),
    discount: joi.number().min(1).max(100),
    category: joi.string().custom(isValidObjectId),
    subcategory: joi.string().custom(isValidObjectId),
    brand: joi.string().custom(isValidObjectId),
  })
  .required();

// delte product + read single product
export const ProductIdSchema = joi
  .object({
    productId: joi.string().custom(isValidObjectId).required(),
  })
  .required();
