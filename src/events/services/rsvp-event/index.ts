import { dispatch } from "@/app"
import { BadRequestError, HttpStatus, cloudinary, eventRegistrationMail2, type Context } from "@/core"
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

        // dispatch("event:sendMail", {
        //     to: input.email,
        //     subject: "Event Registration",
        //     body: eventRegistrationMail({
        //         lastName: user.lastName,
        //         firstName: user.firstName,
        //         link: `/auth/reset-password?resetToken=`,
        //     }),
        // })

        dispatch("event:sendMail", {
            to: input.email,
            subject: "Event Registration",
            body: eventRegistrationMail2({
                lastName: user.lastName,
                firstName: user.firstName,
                eventPhoto:"https://i.ibb.co/58gnFHY/entrepreneurevents-copy-4x-1-4.png",
                eventDate: "April 25, 2024",
                eventTime: "10:00 AM to 5:00 PM",
                eventLocation: "International Tech Convention Center, 45 Tech Park Blvd, San Francisco, CA.",
                eventName: "Event 1",
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
