import { dispatch } from "@/app"
import { BadRequestError, HttpStatus, cloudinary, eventRegistrationMail, type Context } from "@/core"
import type { RSVPEventPayload } from "@/events/interfaces"
import { Event, EventAttendance } from "@/events/model"
import { createQRCode } from "@/events/utils/createQrCode"
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

        const qrCode = await createQRCode(
            JSON.stringify({
                userId: user.id,
                eventId,
            }),
        )

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
            body: eventRegistrationMail({
                lastName: user.lastName,
                firstName: user.firstName,
                link: `/auth/reset-password?resetToken=`,
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
