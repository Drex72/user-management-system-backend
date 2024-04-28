import { BadRequestError, HttpStatus, config, imageUploadService, type Context } from "@/core"
import type { UpdateEventPayload } from "@/events/interfaces"
import { Event } from "@/events/model"

class UpdateEvent {
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

        if (!files?.coverPhoto) {
            await event.update({ ...input }, { where: { id: eventId } })

            await event.save()
        }

        return {
            code: HttpStatus.OK,
            message: "Event Updated Successfully",
            data: event,
        }
    }
}

export const updateEvent = new UpdateEvent(Event)
