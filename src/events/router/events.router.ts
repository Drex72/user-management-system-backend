import { ControlBuilder } from "@/core/middlewares/controlBuilder"
import { Router } from "express"
import { createEvent, rsvpEvent } from "../services"
import { createEventSchema, rsvpEventSchema } from "./schema"

export const eventsRouter = Router()


eventsRouter
  .route("/")
  .post(
    ControlBuilder.builder()
      .setHandler(createEvent.handle)
      .setValidator(createEventSchema)
      
      .handle(),
  )



eventsRouter.post(
  '/rsvp',
  ControlBuilder.builder()
  .setHandler(rsvpEvent.handle)
  .setValidator(rsvpEventSchema)
  .isIpRestricted(["213.255.128.169"])
  .handle()
)