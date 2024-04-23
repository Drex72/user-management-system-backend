import { BadRequestError, ForbiddenError, HttpStatus, config, imageUploadService, logger, sequelize, type Context } from "@/core"
import type { CreateEventPayload } from "@/events/interfaces"
import { Event } from "@/events/model"

class CreateEvent {
    constructor(private readonly dbEvent: typeof Event) {}

    handle = async ({ input, files }: Context<CreateEventPayload>) => {
        if (!files || !files.coverPhoto) throw new ForbiddenError("Cover Photo is required")

        const { name } = input

        const event = await this.dbEvent.findOne({
            where: { name },
        })

        if (event) throw new BadRequestError("Event Exists!")

        const uploadedImage = await imageUploadService.imageUpload(config.cloudinary.assetsFolder, files.coverPhoto)

        const dbTransaction = await sequelize.transaction()

        try {
            let inviteLink: string = `https://link.com/`

            const createdEvent = await this.dbEvent.create({ ...input, photo: uploadedImage.secure_url, inviteLink }, { transaction: dbTransaction })

            inviteLink += createdEvent.id

            await this.dbEvent.update({ inviteLink }, { where: { id: createdEvent.id }, transaction: dbTransaction })

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
