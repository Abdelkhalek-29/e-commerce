import { Router } from "express";
import { createCategorySchema,updateCategorySchema , deleteCategorySchema } from "./category.validation.js";
import { isAuthenticated } from "../../middleware/authuntication.middleware.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
import { fileUpload } from "../../utils/multer.js";
import { filterObject } from "../../utils/multer.js";
import subcategoryRouter from "./../subcategory/subcategory.router.js"
import productRouter from "./../product/prouduct.router.js"
import {createCategory ,
      updateCategory ,
      deleteCategory,
      allCatigories} from "./category.controller.js"
import { isValid } from "../../middleware/validation.middleware.js";
const router = Router()


router.use("/:categoryId/subcategory", subcategoryRouter)
router.use("/:categoryId/product", productRouter)

//CRuD
//create category
router.post("/" ,
isAuthenticated,
isAuthorized("admin"),
fileUpload(filterObject.image).single("category"),
isValid(createCategorySchema),
createCategory)
export default router

// update category
router.patch("/:categoryId" , 
isAuthenticated , 
isAuthorized("admin"),
fileUpload(filterObject.image).single("category"),
isValid(updateCategorySchema),
updateCategory
)
// delete category
router.delete("/:categoryId" , 
isAuthenticated , 
isAuthorized("admin"),
isValid(deleteCategorySchema),
deleteCategory
)


//Get categories
router.get("/",allCatigories)
