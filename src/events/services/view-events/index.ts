import { HttpStatus } from "@/core"
import { Event } from "@/events/model"

class ViewEvents {
    constructor(private readonly dbEvent: typeof Event) {}

    handle = async () => {
        const allEvents = await this.dbEvent.findAll()

        return {
            code: HttpStatus.OK,
            message: "Events Retrieved Successfully",
            data: allEvents,
        }
    }
}

export const viewEvents = new ViewEvents(Event)
