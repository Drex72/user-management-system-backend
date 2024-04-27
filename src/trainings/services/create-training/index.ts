import { BadRequestError, HttpStatus, logger, type Context } from "@/core"
import { CreateTrainingPayload } from "@/trainings/interfaces"
import { Training } from "@/trainings/model"

class CreateTraining {
    constructor(private readonly dbTrainings: typeof Training) {}

    handle = async ({ input }: Context<CreateTrainingPayload>) => {
        const { endDate, name, startDate } = input

        const trainingExists = await this.dbTrainings.findOne({
            where: { name },
        })

        if (trainingExists) throw new BadRequestError(`Training with name ${name} already exists`)

        if (startDate < new Date(Date.now())) throw new BadRequestError("Start Date cannot be earlier than Current date")

        if (endDate < startDate) throw new BadRequestError("Start Date cannot be later than End date")

        const createdTraining = await this.dbTrainings.create(input)

        logger.info(`Training with ID ${createdTraining.id} created successfully`)

        return {
            code: HttpStatus.CREATED,
            message: "Training with ID ${createdTraining.id} created successfully",
            data: createdTraining,
        }
    }
}

export const createTraining = new CreateTraining(Training)
