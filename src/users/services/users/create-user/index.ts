import { BadRequestError, HttpStatus, type Context } from "@/core"
import { AppMessages } from "@/core/common"
import { createUser } from "@/users/helpers"
import { CreateNewUserPayload } from "@/users/interfaces"

class CreateUser {
    constructor() {}

    handle = async ({ input }: Context<CreateNewUserPayload>) => {
        const createdUser = await createUser.handle(input)

        if (!createdUser.newUserCreated) throw new BadRequestError("User already exists!")

        return {
            code: HttpStatus.CREATED,
            message: "User Created Successfully",
            data: createdUser.newUser,
        }
    }
}

export const createSingleUser = new CreateUser()
