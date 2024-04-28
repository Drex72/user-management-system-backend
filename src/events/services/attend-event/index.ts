import { encryptor } from "@/auth/helpers/encryptor"
import { BadRequestError, HttpStatus, type Context } from "@/core"
import { AttendEventPayload, ParsedTokenPayload } from "@/events/interfaces"
import { EventAttendance } from "@/events/model"

class AttendEvent {
    constructor(private readonly dbEventAttendees: typeof EventAttendance) {}

    handle = async ({ input }: Context<AttendEventPayload>) => {
        const { token } = input

        const decryptedPayload = encryptor.decrypt(token)

        if (!decryptedPayload) throw new BadRequestError("Invalid token")

        const parsedPayload: ParsedTokenPayload = JSON.parse(decryptedPayload)

        if (!parsedPayload?.eventId || !parsedPayload?.userId) throw new BadRequestError("Invalid token")

        const { eventId, userId } = parsedPayload

        const eventAttendee = await this.dbEventAttendees.findOne({
            where: { eventId, userId },
        })

        if (!eventAttendee) throw new BadRequestError("No record Found of User registered with Event!")

        eventAttendee.status = "attended"

        await eventAttendee.save()

        return {
            code: HttpStatus.OK,
            message: "Event Attended Successfully",
            data: eventAttendee,
        }
    }
}

export const attendEvent = new AttendEvent(EventAttendance)
