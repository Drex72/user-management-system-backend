import type { SignUpPayload } from "@/auth/interfaces"
import { Auth } from "@/auth/model"
import { HttpStatus, hashData, logger, sequelize, type Context } from "@/core"
import { AppMessages } from "@/core/common"
import { createUser } from "@/users/helpers"

class SignUp {
    constructor(private readonly dbAuth: typeof Auth) {}

    handle = async ({ input }: Context<SignUpPayload>) => {
        const dbTransaction = await sequelize.transaction()

        const { email, password } = input

        // Hash the Password
        const hashPassword = await hashData(password)

        try {
            // Create the User
            const createdUser = await createUser.handle(input, dbTransaction)

            await this.dbAuth.create({ email, userId: createdUser.id, password: hashPassword }, { transaction: dbTransaction })

            logger.info(`User with ID ${createdUser.id} created successfully`)

            await dbTransaction.commit()

            return {
                code: HttpStatus.OK,
                message: AppMessages.SUCCESS.ACCOUNT_CREATED,
                data: createdUser,
            }
        } catch (error: any) {
            dbTransaction.rollback()

            logger.error(error?.message || "Transaction failed, rolled back all operations")

            throw new Error("Error while Signing Up. Please make sure Roles are correct and retry.")
        }
    }
}

export const signUp = new SignUp(Auth)
