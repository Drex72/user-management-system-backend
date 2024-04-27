import { HttpStatus, type Context } from "@/core"
import { createUser } from "@/users/helpers"
import { CreateNewUserPayload } from "@/users/interfaces"

class CreateUser {
    constructor() {}

    handle = async ({ input }: Context<CreateNewUserPayload>) => {
        const createdUser = await createUser.handle(input)

        return {
            code: HttpStatus.CREATED,
            message: "User Created Successfully",
            data: createdUser,
        }
    }
}

export const createSingleUser = new CreateUser()
