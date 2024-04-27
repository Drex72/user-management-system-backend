import { UserRoles } from "@/auth/model"
import { BadRequestError, logger } from "@/core"
import { AppMessages } from "@/core/common"
import { BaseUserPayload } from "@/users/interfaces"
import { User } from "@/users/model"
import { Op, Transaction } from "sequelize"

class CreateUser {
    constructor(private readonly dbUser: typeof User, private readonly dbUserRoles: typeof UserRoles) {}

    handle = async (input: BaseUserPayload, transaction?: Transaction) => {
        const { email, phoneNumber, roleIds = [] } = input

        const conditions: Record<string, string>[] = [{ email: email }]

        // Only add phone number to the search conditions if it is provided
        if (phoneNumber) {
            conditions.push({ phoneNumber: phoneNumber })
        }

        const userExists = await this.dbUser.findOne({
            where: {
                [Op.or]: conditions,
            },
        })

        if (userExists) throw new BadRequestError(AppMessages.FAILURE.EMAIL_EXISTS)

        // Create the User
        const newUser = await this.dbUser.create(
            {
                email,
                firstName: input.firstName,
                lastName: input.lastName,
            },
            { transaction },
        )

        const payload = roleIds.map((roleId) => ({
            userId: newUser.id,
            roleId,
            active: true,
        }))

        // Bulk create user permissions
        await this.dbUserRoles.bulkCreate(payload, { transaction })

        logger.info(`User with ID ${newUser.id} created successfully`)

        return newUser
    }
}

export const createUser = new CreateUser(User, UserRoles)
