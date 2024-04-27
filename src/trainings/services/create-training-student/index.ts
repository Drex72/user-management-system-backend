import { BadRequestError, HttpStatus, type Context } from "@/core"
import { CreateTrainingStudentPayload } from "@/trainings/interfaces"
import { Training, TrainingStudents } from "@/trainings/model"
import { createUser } from "@/users/helpers"

class CreateTrainingStudent {
    constructor(private readonly dbTraining: typeof Training, private readonly dbTrainingStudents: typeof TrainingStudents) {}

    handle = async ({ input, query }: Context<CreateTrainingStudentPayload>) => {
        const training = await this.dbTraining.findOne({
            where: {
                id: query.trainingId,
            },
        })

        if (!training) throw new BadRequestError("Training not found")

        const { newUser } = await createUser.handle(input)

        await this.dbTrainingStudents.create({
            userId: newUser.id,
            trainingId: query.trainingId,
        })

        return {
            code: HttpStatus.CREATED,
            message: "Training Student Created Successfully",
        }
    }
}

export const createTrainingStudent = new CreateTrainingStudent(Training, TrainingStudents)
