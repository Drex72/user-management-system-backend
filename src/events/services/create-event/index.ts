import { BadRequestError, ForbiddenError, HttpStatus, cloudinary, config, imageUploadService, logger, sequelize, type Context } from "@/core"
import type { CreateEventPayload } from "@/events/interfaces"
import { Event } from "@/events/model"
import { createQRCode } from "@/events/utils/createQrCode"

class CreateEvent {
    constructor(private readonly dbEvent: typeof Event) {}

    handle = async ({ input, files }: Context<CreateEventPayload>) => {
        if (!files || !files.coverPhoto) throw new ForbiddenError("Cover Photo is required")

        const { name } = input

        const event = await this.dbEvent.findOne({
            where: { name },
        })

        if (event) throw new BadRequestError(`Event with name ${name} already exists`)

        const uploadedImage = await imageUploadService.imageUpload(config.cloudinary.assetsFolder, files.coverPhoto)

        const dbTransaction = await sequelize.transaction()

        try {
            let inviteLink: string = `https://link.com/`

            const qrCode = await createQRCode(inviteLink)

            // Upload to Cloudinary
            const qrCodeUrl = await cloudinary.uploader.upload(qrCode, {
                folder: "qr_codes",
                use_filename:true,
            })

            const createdEvent = await this.dbEvent.create(
                { ...input, photo: uploadedImage.url, inviteLink, inviteQrCode: qrCodeUrl.secure_url },
                { transaction: dbTransaction },
            )

            inviteLink = `https://attendance-delta-black.vercel.app/forms?eventId=${createdEvent.id}`

            inviteLink += createdEvent.id

            await this.dbEvent.update({ inviteLink }, { where: { id: createdEvent.id }, transaction: dbTransaction })

            dbTransaction.commit()

            return {
                code: HttpStatus.OK,
                message: "Event Created Successfully",
                data: createdEvent,
            }
        } catch (error: any) {
            dbTransaction.rollback()

            logger.error(error?.message || "Transaction failed, rolled back all operations")

            throw new Error("Error while Creating Event")
        }
    }
}

export const createEvent = new CreateEvent(Event)
