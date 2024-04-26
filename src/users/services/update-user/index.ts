import { BadRequestError, HttpStatus, UnAuthorizedError, type Context } from "@/core"
import type { UpdateUserPayload } from "@/users/interfaces"
import { User } from "@/users/model"

class EditUser {
    constructor(private readonly dbUser: typeof User) { }
    handle = async ({ input, query }: Context<UpdateUserPayload>) => {
        const { userId } = query
        const user = await this.dbUser.findOne({
            where: { id: userId }
        })
        if (!user) throw new BadRequestError("User credentials not found")

        if (input) {
            await this.dbUser.update({ ...input }, { where: { id: userId } })
        }

        return {
            code: HttpStatus.OK,
            message: "User Profile Updated Successfully"
        }
    }
}

export const editUser = new EditUser(User)