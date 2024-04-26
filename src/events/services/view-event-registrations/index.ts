//once the user scans a qr code, the user is redirected to the event page, th front send userid and eventid to the backend and the backend checks if the user is already registered for the event, change to attended
import { BadRequestError, ForbiddenError, HttpStatus, config, imageUploadService, logger, sequelize, type Context } from "@/core"

import { EventAttendance } from "@/events/model"
import { RSVPEventPayload } from "../../interfaces"



class EventRegistered{
    constructor(private readonly dbEvent: typeof EventAttendance) {}

    handle = async ({ query }: Context<RSVPEventPayload>) =>{

        try {

            const { eventId } = query

            const events = await this.dbEvent.findAll({ where: {status: "registered"}, eventId: eventId})

            if (!events) throw new BadRequestError("No one registered for this event yet")

            return {
                code: HttpStatus.OK,
                message: "All events successfully retrieved",
                data: events,
            }
        } catch (error) {
            throw new Error("Error while getting those that registered for this event ")
        }
    }
}


export const eventRegistered = new EventRegistered(EventAttendance)