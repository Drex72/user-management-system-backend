import type { SignUpPayload } from "@/auth/interfaces"
import { UserRoles } from "@/auth/model"
import { BadRequestError, HttpStatus, hashData, logger, sequelize, type Context } from "@/core"
import { AppMessages } from "@/core/common"
import { User } from "@/users/model"

class SignUp {
    constructor(private readonly dbUser: typeof User, private readonly dbUserRoles: typeof UserRoles) {}

    handle = async ({ input }: Context<SignUpPayload>) => {
        const { email, password, roleIds } = input

        const userExists = await this.dbUser.findOne({
            where: { email },
        })

        if (userExists) throw new BadRequestError(AppMessages.FAILURE.EMAIL_EXISTS)

        // Hash the Password
        const hashPassword = await hashData(password)

        const dbTransaction = await sequelize.transaction()

        try {
            // Create the User
            const newUser = await this.dbUser.create({ ...input, password: hashPassword })

            // Create payload for bulk insertion
            const payload = roleIds.map((roleId) => ({
                userId: newUser.id,
                roleId,
                active: true,
            }))

            // Bulk create user permissions
            await this.dbUserRoles.bulkCreate(payload)

            logger.info(`User with ID ${newUser.id} created successfully`)

            await dbTransaction.commit()

            return {
                code: HttpStatus.OK,
                message: AppMessages.SUCCESS.ACCOUNT_CREATED,
                data: newUser,
            }
        } catch (error: any) {
            dbTransaction.rollback()

            logger.error(error?.message)

            throw new Error(error?.message ?? "Error while Signing Up. Please make sure Roles are correct")
        }
    }
}

export const signUp = new SignUp(User, UserRoles)
