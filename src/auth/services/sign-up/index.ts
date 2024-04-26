import type { SignUpPayload } from "@/auth/interfaces"
import { Auth, UserRoles } from "@/auth/model"
import { BadRequestError, HttpStatus, hashData, logger, sequelize, type Context } from "@/core"
import { AppMessages } from "@/core/common"
import { User } from "@/users/model"
import { Op } from "sequelize"

class SignUp {
    constructor(private readonly dbAuth: typeof Auth, private readonly dbUser: typeof User, private readonly dbUserRoles: typeof UserRoles) {}

    handle = async ({ input }: Context<SignUpPayload>) => {
        const { email, password, phoneNumber, roleIds } = input

        const conditions: Record<string, string>[] = [{ email: email }]

        // Only add phone number to the search conditions if it is provided
        if (phoneNumber) {
            conditions.push({ phoneNumber: phoneNumber })
        }

        const userExists = await this.dbAuth.findOne({
            where: {
                [Op.or]: conditions,
            },
        })

        if (userExists) throw new BadRequestError(AppMessages.FAILURE.EMAIL_EXISTS)

        // Hash the Password
        const hashPassword = await hashData(password)

        const dbTransaction = await sequelize.transaction()

        try {
            // Create the User

            const newUser = await this.dbUser.create(
                {
                    email,
                    firstName: input.firstName,
                    lastName: input.lastName,
                },
                { transaction: dbTransaction },
            )
            await this.dbAuth.create({ email, userId: newUser.id, password: hashPassword }, { transaction: dbTransaction })

            // Create payload for bulk insertion
            const payload = roleIds.map((roleId) => ({
                userId: newUser.id,
                roleId,
                active: true,
            }))

            // Bulk create user permissions
            await this.dbUserRoles.bulkCreate(payload, { transaction: dbTransaction })

            logger.info(`User with ID ${newUser.id} created successfully`)

            await dbTransaction.commit()

            return {
                code: HttpStatus.OK,
                message: AppMessages.SUCCESS.ACCOUNT_CREATED,
                data: newUser,
            }
        } catch (error: any) {
            dbTransaction.rollback()

            logger.error(error?.message || "Transaction failed, rolled back all operations")

            throw new Error("Error while Signing Up. Please make sure Roles are correct and retry.")
        }
    }
}

export const signUp = new SignUp(Auth, User, UserRoles)
