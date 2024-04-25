import { BadRequestError, HttpStatus, UnAuthorizedError, config, imageUploadService, type Context } from "@/core"
import { BadRequestError, HttpStatus, UnAuthorizedError, config, imageUploadService, type Context } from "@/core"
import type { UpdateEventPayload } from "@/events/interfaces"
import { Event } from "@/events/model"

class EditEvent {
    constructor(private readonly dbEvent: typeof Event) {}

    handle = async ({ input, files, query }: Context<UpdateEventPayload>) => {
        const { eventId } = query

        const event = await this.dbEvent.findOne({
            where: { id: eventId },
        })
        if (!event) throw new BadRequestError("Invalid Event!")

        if (files?.coverPhoto) {
            const uploadedImage = await imageUploadService.imageUpload(config.cloudinary.assetsFolder, files.coverPhoto)

            await this.dbEvent.update({ ...input, photo: uploadedImage?.secure_url }, { where: { id: eventId } })
        }

        if (!files.coverPhoto) {
            await this.dbEvent.update({ ...input }, { where: { id: eventId } })
        }

        return {
            code: HttpStatus.OK,
            message: "Event Updated Successfully",
        }
    }
}

export const editEvent = new EditEvent(Event)
