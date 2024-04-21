
import { ControlBuilder } from "@/core/middlewares/controlBuilder"
import { Router } from "express"
import { signIn, signOut, signUp } from "../services"
import { signInSchema, signUpSchema } from "./schema"

export const authRouter = Router()

authRouter.get(
    "/sign-up", 
    ControlBuilder.builder()
    .setHandler(signUp.handle)
    .setValidator(signUpSchema)
    .handle()
)

authRouter.post(
    "/sign-in", 
    ControlBuilder.builder()
    .setValidator(signInSchema)
    .setHandler(signIn.handle)
    .handle()
)

authRouter.post(
    "/sign-out", 
    ControlBuilder.builder()
    .setHandler(signOut.handle)
    .isPrivate()
    .handle()
)




