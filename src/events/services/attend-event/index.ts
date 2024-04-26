
import { BadRequestError, ForbiddenError, HttpStatus, config, imageUploadService, logger, sequelize, type Context } from "@/core"
import { EventAttendance } from "./event.model"


class AttendEvent{
    constructor(private readonly dbEvent: typeof EventAttendance) {}

    handle = async ({ query }: Context<any>) => {

        try {
            const { eventId, userId } = query

            const event = await this.dbEvent.findOne({
                where: { eventId, userId },
            })

            if (!event) throw new BadRequestError("Invalid Event!")

            await this.dbEvent.update({ status: "attended" }, { where: { eventId, userId } })

            return {
                code: HttpStatus.OK,
                message: "Event Attended Successfully",
            }
        } catch (error) {
            throw new Error("Error while attending event")

        }
    }
}


export const attendEvent = new AttendEvent(EventAttendance)