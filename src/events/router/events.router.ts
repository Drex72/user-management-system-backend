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
      .isPrivate()
      .only("ADMIN")
      .handle(),
  )
  .get(
    ControlBuilder.builder()
      .setHandler(viewEvents.handle)
      .isPrivate()
      .handle(),
  )
  .patch(
    ControlBuilder.builder()
      .setHandler(updateEvent.handle)
      .setValidator(updateEventSchema)
      .isPrivate()
      .only("ADMIN")
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
  .isPrivate()
  .isIpRestricted(["213.255.128.169"])
  .handle()
)

eventsRouter.get(
  '/attendees',
  ControlBuilder.builder()
  .setHandler(viewEventAttendees.handle)
  .setValidator(eventQuerySchema)
  .isPrivate()
  .only("ADMIN")
  .handle()
)

eventsRouter.get(
  '/registrations',
  ControlBuilder.builder()
  .setHandler(viewEventRegistrations.handle)
  .setValidator(eventQuerySchema)
  .isPrivate()
  .only("ADMIN")
  .handle()
)

