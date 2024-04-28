import { ControlBuilder } from "@/core/middlewares/controlBuilder"
import { Router } from "express"
import { attendEvent, createEvent, rsvpEvent, updateEvent, viewEventAttendees, viewEventRegistrations, viewEvents } from "../services"
import { attendEventSchema, createEventSchema, eventQuerySchema, rsvpEventSchema, updateEventSchema } from "./schema"

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
  .patch(
    ControlBuilder.builder()
      .setHandler(updateEvent.handle)
      .setValidator(updateEventSchema)
      .handle(),
  )

eventsRouter.post(
  '/rsvp',
  ControlBuilder.builder()
  .setHandler(rsvpEvent.handle)
  .setValidator(rsvpEventSchema)
  .handle()
)

eventsRouter.post(
  '/attend',
  ControlBuilder.builder()
  .setHandler(attendEvent.handle)
  .setValidator(attendEventSchema)
  .isIpRestricted(["213.255.128.169"])
  .handle()
)

eventsRouter.get(
  '/attendees',
  ControlBuilder.builder()
  .setHandler(viewEventAttendees.handle)
  .setValidator(eventQuerySchema)
  .handle()
)

eventsRouter.get(
  '/registrations',
  ControlBuilder.builder()
  .setHandler(viewEventRegistrations.handle)
  .setValidator(eventQuerySchema)
  .handle()
)

