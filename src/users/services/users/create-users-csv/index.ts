import { BadRequestError, ForbiddenError, HttpStatus, Joi, logger, sequelize, type Context } from "@/core"
import { AppMessages } from "@/core/common"
import { createUser } from "@/users/helpers"
import { BaseUserPayload, CreateBulkUsersPayload } from "@/users/interfaces"
import csvToJson from "convert-csv-to-json"

const csvSchema = Joi.object({
    email: Joi.string().required().trim(),
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    phoneNumber: Joi.string().trim().allow(""),
})

class CreateUsers {
    constructor() {}

    handle = async ({ files, query }: Context<CreateBulkUsersPayload>) => {
        if (!files || !files.csv || Array.isArray(files.csv)) throw new ForbiddenError("csv is required")

        const convertedJson = (await csvToJson.fieldDelimiter(",").getJsonFromCsv(files.csv.tempFilePath)) as Omit<BaseUserPayload, "roleIds">[]

        const dbTransaction = await sequelize.transaction()

        try {
            const createdUsers = []

            const existingUsers = []

            for (const userData of convertedJson) {
                let value = csvSchema.validate(userData)

                if (value.error) throw new BadRequestError(`Invalid User ${JSON.stringify(userData)}`)

                const { phoneNumber, ...rest } = userData

                const payload = this.isValidPhoneNumber(phoneNumber) ? userData : rest

                const createdUser = await createUser.handle({ ...payload, roleIds: [query.roleId] }, dbTransaction)

                if (!createdUser.newUserCreated) {
                    existingUsers.push(createdUser.newUser)
                } else {
                    createdUsers.push(createdUser.newUser)
                }
            }

            await dbTransaction.commit()

            return {
                code: HttpStatus.CREATED,
                message: AppMessages.SUCCESS.BULK_CREATE_SUCCESS,
                data: {
                    newUsers: createdUsers,
                    existingUsers,
                },
            }
        } catch (error: any) {
            dbTransaction.rollback()

            logger.error(error?.message || "Transaction failed, rolled back all operations")

            throw new Error("Error while bulk creating users. Please make sure data is correct and retry.")
        }
    }

    private isValidPhoneNumber(phoneNumber: any): boolean {
        // Check if phoneNumber is a non-empty string and matches the regex
        return typeof phoneNumber === "string" && phoneNumber.trim() !== ""
    }
}

export const createBulkUsers = new CreateUsers()
