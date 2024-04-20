import { ControlBuilder } from "@/core/middlewares/controlBuilder"
import { Router } from "express"
import { refreshToken, signIn, signOut } from "../services"
import { signInSchema } from "./schema"

export const authRouter = Router()

authRouter.post(
    "/sign-in", 
    ControlBuilder.builder()
    .setValidator(signInSchema)
    .setHandler(signIn.handle)
    .handle()
)

authRouter.get(
    "/refresh-token", 
    ControlBuilder.builder()
    .setHandler(refreshToken.handle)
    .handle()
)


authRouter.post(
    "/sign-out", 
    ControlBuilder.builder()
    .setHandler(signOut.handle)
    .isPrivate()
    .handle()
)




