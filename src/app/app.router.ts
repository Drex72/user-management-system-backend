import { authRouter } from "@/authentication"
import { HttpStatus } from "@/core"
import { Router } from "express"

export const appRouter = Router()

appRouter.use("/auth", authRouter)

appRouter.get("/health", (_, res) => {
    res.status(HttpStatus.OK).json({
        message: "Api up",
        version: "1.0",
    })
})
