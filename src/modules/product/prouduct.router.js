import { Router } from "express";
import { isAuthenticated } from "../../middleware/authuntication.middleware.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
import { fileUpload } from "../../utils/multer.js";
import { filterObject } from "../../utils/multer.js";
import { isValid } from "../../middleware/validation.middleware.js";
import {ProductIdSchema, createProductschema} from "./product.validation.js"
import { addProduct, allProducts, deleteProduct ,singleProduct } from "./product.controller.js";
const router=Router({mergeParams:true})


// CRUD

// create product
router.post("/" ,
isAuthenticated,
isAuthorized("admin"),
fileUpload(filterObject.image).fields([
    {name:"defaultImage", maxCount :1},
    {name: "subImages", maxCount :3 }
]) ,
isValid(createProductschema),
addProduct)

// single product 
router.get("/single/productId",isValid(ProductIdSchema),singleProduct)

// delete product
router.delete("/:productId",
isAuthenticated,
isAuthorized("admin"),
isValid(ProductIdSchema),
deleteProduct
)

// get all products
router.get("/" , allProducts)
export default router