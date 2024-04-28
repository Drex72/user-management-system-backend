import { BadRequestError, ForbiddenError, HttpStatus, Joi, logger, sequelize, type Context } from "@/core"
import { AppMessages } from "@/core/common"
import { createUser } from "@/users/helpers"
import { BaseUserPayload, CreateBulkUsersPayload } from "@/users/interfaces"
import csvToJson from "convert-csv-to-json"

const csvSchema = Joi.object({
    email: Joi.string().required().trim(),
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    phoneNumber: Joi.string().trim().optional(),
})

class CreateUsers {
    constructor() {}

    handle = async ({ files, query }: Context<CreateBulkUsersPayload>) => {
        if (!files || !files.csv || Array.isArray(files.csv)) throw new ForbiddenError("csv is required")

        const convertedJson = (await csvToJson.fieldDelimiter(",").getJsonFromCsv(files.csv.tempFilePath)) as Omit<BaseUserPayload, "roleIds">[]

        const dbTransaction = await sequelize.transaction()

        try {
            const createdUsers = []

            for (const userData of convertedJson) {
                let value = csvSchema.validate(userData)

                if (value.error) throw new BadRequestError(`Invalid User ${JSON.stringify(userData)}`)

                const createdUser = await createUser.handle({ ...userData, roleIds: [query.roleId] }, dbTransaction)

                if (!createdUser.newUserCreated) throw new BadRequestError(AppMessages.FAILURE.EMAIL_EXISTS)

                createdUsers.push(createdUser.newUser)
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

export const createBulkUsers = new CreateUsers()
