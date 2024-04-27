import { HttpStatus } from "@/core"
import { Training } from "@/trainings/model"

class ViewTrainings {
    constructor(private readonly dbTraining: typeof Training) {}

    handle = async () => {
        const allTrainings = await this.dbTraining.findAll()

        return {
            code: HttpStatus.OK,
            message: "Trainings Retrieved Successfully",
            data: allTrainings,
        }
    }
}

export const viewTrainings = new ViewTrainings(Training)
