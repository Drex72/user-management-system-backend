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

        await user.update({ ...input }, { where: { id: userId } })

        await user.save()

        return {
            code: HttpStatus.OK,
            message: "User Updated Successfully",
            data: user,
        }
    }
}

export const updateUser = new UpdateUser(User)
