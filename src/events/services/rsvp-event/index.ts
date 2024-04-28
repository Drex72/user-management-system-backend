import { dispatch } from "@/app"
import { encryptor } from "@/auth/helpers/encryptor"
import { BadRequestError, HttpStatus, cloudinary, eventRegistrationMail2, type Context } from "@/core"
import type { RSVPEventPayload } from "@/events/interfaces"
import { Event, EventAttendance } from "@/events/model"
import { createQRCode } from "@/events/utils/createQrCode"
import { formatDate } from "@/events/utils/formatDate"
import { formatTime } from "@/events/utils/formatTime"
import { User } from "@/users/model"

class RSVPEvent {
    constructor(
        private readonly dbEvent: typeof Event,
        private readonly dbUser: typeof User,
        private readonly dbEventAttendance: typeof EventAttendance,
    ) {}

    handle = async ({ input, query }: Context<RSVPEventPayload>) => {
        const { eventId } = query

        const event = await this.dbEvent.findOne({
            where: { id: eventId },
        })

        if (!event) throw new BadRequestError("Invalid Event!")

        if (event.limit) {
            const eventAttendees = await this.dbEventAttendance.findAll({
                where: {
                    eventId: eventId,
                },
            })

            if (eventAttendees.length === event.limit) throw new BadRequestError("Event Limit has been exceeded!")
        }

        let user = await this.dbUser.findOne({
            where: {
                email: input.email,
            },
        })

        if (!user) {
            user = await this.dbUser.create({
                ...input,
            })
        }

        const existingRegisteredUser = await this.dbEventAttendance.findOne({
            where: {
                userId: user.id,
                eventId: event.id,
            },
        })

        if (existingRegisteredUser) {
            throw new BadRequestError("You have already registered for this event!")
        }

        const encryptedQrCodePayload = encryptor.encrypt(
            JSON.stringify({
                userId: user.id,
                eventId,
            }),
        )

        const qrCode = await createQRCode(`https://link.com/attend-event?token=${encryptedQrCodePayload}`)

        // Upload to Cloudinary
        const qrCodeUrl = await cloudinary.uploader.upload(qrCode, {
            folder: "qr_codes",
        })

        const registeredUser = await this.dbEventAttendance.create({
            eventId,
            status: "registered",
            userId: user.id,
            qrCode: qrCodeUrl.secure_url,
        })

        dispatch("event:sendMail", {
            to: input.email,
            subject: "Event Registration",
            body: eventRegistrationMail2({
                lastName: user.lastName,
                firstName: user.firstName,
                eventPhoto: event.photo,
                eventDate: formatDate(event.date as any),
                eventTime: formatTime(event.time),
                eventLocation: "NITDA IT Hub, 6 Commercial Rd, University Of Lagos, Lagos 101245, Lagos",
                eventName: event.name,
                qrCode: qrCodeUrl.secure_url,
            }),
        })

        return {
            code: HttpStatus.OK,
            message: "User Registered Successfully",
            data: registeredUser,
        }
    }
}

export const rsvpEvent = new RSVPEvent(Event, User, EventAttendance)
