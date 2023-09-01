import { Router } from "express";
import { activateSchema, forgetCodeSchema, loginSchema, registerSchema ,resetPasswordSchema } from "./auth.validation.js";
import { isValid } from "../../middleware/validation.middleware.js";
import { activateAccount , login,sendForgetCode ,resetPassword ,register } from "./auth.controller.js";
const router =Router()

//Register
router.post("/register" , isValid(registerSchema) ,register)

//Activate Account
router.get("/confirmEmail/:activationCode", isValid(activateSchema),activateAccount)

//Login
router.post("/login",isValid(loginSchema),login)

//send forget password code
router.patch("/forgetcode" , isValid(forgetCodeSchema),sendForgetCode)

//Reset Password
router.patch("/resetpassword",isValid(resetPasswordSchema) , resetPassword)

export default router