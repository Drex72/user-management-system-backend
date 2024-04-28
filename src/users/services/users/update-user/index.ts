import { BadRequestError, HttpStatus, type Context } from "@/core"
import type { UpdateUserPayload } from "@/users/interfaces"
import { User } from "@/users/model"

class UpdateUser {
    constructor(private readonly dbUser: typeof User) {}

    handle = async ({ input, query }: Context<UpdateUserPayload>) => {
        const { userId } = query

        if (!input) throw new BadRequestError("Invalid Input")

        const user = await this.dbUser.findOne({
            where: { id: userId },
        })

        if (!user) throw new BadRequestError("Invalid User!")

        await this.dbUser.update({ ...input }, { where: { id: userId } })

        return {
            code: HttpStatus.OK,
            message: "User Updated Successfully",
        }
    }
}

export const updateUser = new UpdateUser(User)
