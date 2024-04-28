import { BadRequestError, ForbiddenError, HttpStatus, Joi, logger, sequelize, type Context } from "@/core"
import { AppMessages } from "@/core/common"
import { CreateTrainingStudentsPayload } from "@/trainings/interfaces"
import { Training, TrainingStudents } from "@/trainings/model"
import { createUser } from "@/users/helpers"
import { BaseUserPayload } from "@/users/interfaces"
import csvToJson from "convert-csv-to-json"

const csvSchema = Joi.object({
    email: Joi.string().required().trim(),
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    phoneNumber: Joi.string().trim().optional(),
})

class CreateTrainingStudents {
    constructor(private readonly dbTraining: typeof Training, private readonly dbTrainingStudents: typeof TrainingStudents) {}

    handle = async ({ files, query }: Context<CreateTrainingStudentsPayload>) => {
        if (!files || !files.csv || Array.isArray(files.csv)) throw new ForbiddenError("csv is required")

        const training = await this.dbTraining.findOne({
            where: {
                id: query.trainingId,
            },
        })

        if (!training) throw new BadRequestError("Training not found")

        const convertedJson = (await csvToJson.fieldDelimiter(",").getJsonFromCsv(files.csv.tempFilePath)) as Omit<BaseUserPayload, "roleIds">[]

        const dbTransaction = await sequelize.transaction()

        try {
            const createdUsers = []

            for (const userData of convertedJson) {
                let value = csvSchema.validate(userData)

                if (value.error) throw new BadRequestError(`Invalid User ${JSON.stringify(userData)}`)

                const { newUser } = await createUser.handle(userData, dbTransaction)

                await this.dbTrainingStudents.create(
                    {
                        userId: newUser.id,
                        trainingId: query.trainingId,
                    },
                    { transaction: dbTransaction },
                )

                createdUsers.push(newUser)
            }

            await dbTransaction.commit()

            return {
                code: HttpStatus.CREATED,
                message: AppMessages.SUCCESS.BULK_CREATE_SUCCESS,
                data: createdUsers,
            }
        } catch (error: any) {
            dbTransaction.rollback()

            logger.error(error?.message || "Transaction failed, rolled back all operations")

            throw new Error("Error while bulk creating users. Please make sure data is correct and retry.")
        }
    }
}

export const createTrainingStudents = new CreateTrainingStudents(Training, TrainingStudents)
