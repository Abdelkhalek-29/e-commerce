import { Router } from "express";
import { createBrandSchema , updateBrandSchema ,  deleteBrandSchema } from "./brand.validation.js";
import { isAuthenticated } from "../../middleware/authuntication.middleware.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
import { fileUpload } from "../../utils/multer.js";
import { filterObject } from "../../utils/multer.js";
import {createBrand ,
        updateBrand ,
        deleteBrand,
        allBrands} from "./brand.controller.js"
import { isValid } from "../../middleware/validation.middleware.js";
const router = Router()



//CRuD
//create brand
router.post("/" ,
isAuthenticated,
isAuthorized("admin"),
fileUpload(filterObject.image).single("brand"),
isValid(createBrandSchema),
createBrand)
export default router

// update brand
router.patch("/:brandId" , 
isAuthenticated , 
isAuthorized("admin"),
fileUpload(filterObject.image).single("brand"),
isValid(updateBrandSchema),
updateBrand
)
// delete brand
router.delete("/:brandId" , 
isAuthenticated , 
isAuthorized("admin"),
isValid(deleteBrandSchema),
deleteBrand
)



//Get categories
router.get("/",allBrands)
