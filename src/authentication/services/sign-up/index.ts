import type { SignUpPayload } from "@/authentication/interfaces"
import { User } from "@/authentication/model/user.model"
import { BadRequestError, HttpStatus, hashData, logger, type Context } from "@/core"
import { AppMessages } from "@/core/common"

class SignUp {
    constructor(private readonly dbUser: typeof User) {}

    handle = async ({ input }: Context<SignUpPayload>) => {
        const { email, password } = input

        const userExists = await this.dbUser.findOne({
            where: { email },
        })

        if (userExists) throw new BadRequestError(AppMessages.FAILURE.EMAIL_EXISTS)

        // Hash the Password
        const hashPassword = await hashData(password)

        // Create the User
        const newUser = await this.dbUser.create({ ...input, password: hashPassword })

        logger.info(`User with ID ${newUser.id} created successfully`)

        return {
            code: HttpStatus.OK,
            message: AppMessages.SUCCESS.ACCOUNT_CREATED,
            data: newUser,
        }
    }
}

export const signUp = new SignUp(User)
