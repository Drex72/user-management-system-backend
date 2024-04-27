import { BadRequestError, HttpStatus, type Context } from "@/core"
import { UpdateTrainingPayload } from "@/trainings/interfaces"
import { Training } from "@/trainings/model"

class UpdateTraining {
    constructor(private readonly dbTraining: typeof Training) {}

    handle = async ({ input, query }: Context<UpdateTrainingPayload>) => {
        const { trainingId } = query

        if (!input) throw new BadRequestError("Invalid Input")

        const training = await this.dbTraining.findOne({
            where: { id: trainingId },
        })

        if (!training) throw new BadRequestError("Invalid Training!")

        await this.dbTraining.update({ ...input }, { where: { id: trainingId } })

        return {
            code: HttpStatus.OK,
            message: "Training Updated Successfully",
        }
    }
}

export const updateTraining = new UpdateTraining(Training)
