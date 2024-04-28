import { BadRequestError, HttpStatus, type Context } from "@/core"

import { RSVPEventPayload } from "@/events/interfaces"
import { Event, EventAttendance } from "@/events/model"

class ViewEventRegistrations {
    constructor(private readonly dbEvent: typeof Event, private readonly dbEventAttendees: typeof EventAttendance) {}

    handle = async ({ query }: Context<RSVPEventPayload>) => {
        const { eventId } = query

        const event = await this.dbEvent.findOne({
            where: { id: eventId },
        })

        if (!event) throw new BadRequestError(`Invalid Event: ${eventId}`)

        const eventRegistrations = await this.dbEventAttendees.findAll({ where: { status: "registered", eventId: eventId } })

        return {
            code: HttpStatus.OK,
            message: "Event Registrations Retrieved Successfully.",
            data: eventRegistrations,
        }
    }
}

export const viewEventRegistrations = new ViewEventRegistrations(Event, EventAttendance)
