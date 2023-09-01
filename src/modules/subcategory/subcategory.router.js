import {Router} from "express"
import { isAuthenticated } from "../../middleware/authuntication.middleware.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
import { isValid } from "../../middleware/validation.middleware.js";
import { fileUpload, filterObject } from "../../utils/multer.js";
import { createSubCategorySchema, deleteSubCategorySchema, updateSubCategorySchema } from "./subcategory.validation.js";
import { createSubCategory ,updateSubCategory , deleteSubCategory , allsubcategories} from "./subcategory.controller.js";

const router=Router({mergeParams:true})

//CRUD
//Create
router.post('/' , 
isAuthenticated,
isAuthorized("admin"),
fileUpload(filterObject.image).single("subcategory"),
isValid(createSubCategorySchema),
createSubCategory
)

//update
router.patch("/:subcategoryId" , 
isAuthenticated,
isAuthorized("admin"),
fileUpload(filterObject.image).single("subcategory"),
isValid(updateSubCategorySchema),
updateSubCategory
)

// delete
router.delete(
    "/:subcategoryId",
    isAuthenticated,
    isAuthorized("admin"),
    isValid(deleteSubCategorySchema),
    deleteSubCategory
)

// read
router.get("/" , allsubcategories)
export default router;