import { ControlBuilder } from "@/core/middlewares/controlBuilder"
import { Router } from "express"
import { createEvent, rsvpEvent, viewEvents, attendEvent, eventRegistered,eventAttendees   } from "../services"
import { createEventSchema, rsvpEventSchema, attendEventSchema } from "./schema"

export const eventsRouter = Router()


eventsRouter
  .route("/")
  .post(
    ControlBuilder.builder()
      .setHandler(createEvent.handle)
      .setValidator(createEventSchema)

      .handle(),
  )
  .get(
    ControlBuilder.builder()
      .setHandler(viewEvents.handle)
      .handle(),
  )

eventsRouter
    .route("/attend")
    .post(
      ControlBuilder.builder()
        .setHandler(attendEvent.handle)
        .setValidator(attendEventSchema)
        .handle(),
    )
    .get(
      ControlBuilder.builder()
        .setHandler(eventRegistered.handle)
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