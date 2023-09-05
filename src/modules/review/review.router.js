import { Router } from "express";
import {isAuthenticated} from "../../middleware/authuntication.middleware.js"
import {addReview} from "./review.constroller.js"
const router = Router()

router.post("/",isAuthenticated,addReview)

export default router;
