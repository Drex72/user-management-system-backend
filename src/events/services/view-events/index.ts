import { BadRequestError, Context, HttpStatus } from "@/core"
import { ViewEventPayload } from "@/events/interfaces"
import { Event } from "@/events/model"

class ViewEvents {
    constructor(private readonly dbEvent: typeof Event) {}

    handle = async ({ input, query }: Context<ViewEventPayload>) => {
        if (query?.eventId) {
            const event = await this.dbEvent.findOne({
                where: {
                    id: query.eventId,
                },
            })

            if (!event) throw new BadRequestError("Invalid Event")

            return {
                code: HttpStatus.OK,
                message: "Events Retrieved Successfully",
                data: event,
            }
        }
        const allEvents = await this.dbEvent.findAll()

        return {
            code: HttpStatus.OK,
            message: "Events Retrieved Successfully",
            data: allEvents,
        }
    }
}

export const viewEvents = new ViewEvents(Event)
