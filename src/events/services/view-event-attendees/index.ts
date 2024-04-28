import { BadRequestError, HttpStatus, type Context } from "@/core"

import { RSVPEventPayload } from "@/events/interfaces"
import { Event, EventAttendance } from "@/events/model"

class ViewEventAttendees {
    constructor(private readonly dbEvent: typeof Event, private readonly dbEventAttendees: typeof EventAttendance) {}

    handle = async ({ query }: Context<RSVPEventPayload>) => {
        const { eventId } = query

        const event = await this.dbEvent.findOne({
            where: { id: eventId },
        })

        if (!event) throw new BadRequestError(`Invalid Event: ${eventId}`)

        const eventAttendees = await this.dbEventAttendees.findAll({ where: { status: "attended", eventId: eventId } })

        return {
            code: HttpStatus.OK,
            message: "Event Attendees Retrieved Successfully.",
            data: eventAttendees,
        }
    }
}

export const viewEventAttendees = new ViewEventAttendees(Event, EventAttendance)
