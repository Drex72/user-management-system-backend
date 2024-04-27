import { Context, HttpStatus } from "@/core"
import { ViewTrainingStudentsPayload } from "@/trainings/interfaces"
import { TrainingStudents } from "@/trainings/model"
import { User } from "@/users/model"

class ViewTrainingStudents {
    constructor(private readonly dbTrainingStudents: typeof TrainingStudents) {}

    handle = async ({ query }: Context<ViewTrainingStudentsPayload>) => {
        const { trainingId } = query

        const allTrainings = await this.dbTrainingStudents.findAll({
            where: {
                trainingId,
            },
            include: [
                {
                    model: User,
                    attributes: ["id", "email", "firstName", "lastName"],
                },
            ],
        })

        return {
            code: HttpStatus.OK,
            message: "Trainings Retrieved Successfully",
            data: allTrainings,
        }
    }
}

export const viewTrainingStudents = new ViewTrainingStudents(TrainingStudents)
