import { authRouter } from "@/auth"
import { HttpStatus } from "@/core"
import { eventsRouter } from "@/events"
import { usersRouter } from "@/users"
import { Router } from "express"

export const appRouter = Router()

appRouter.use("/auth", authRouter)

appRouter.use("/events", eventsRouter)

appRouter.use("/users", usersRouter)



appRouter.get("/health", (_, res) => {
    res.status(HttpStatus.OK).json({
        message: "Api up",
        version: "1.0",
    })
})
