import { Role } from "@/auth/model"
import { HttpStatus, type Context } from "@/core"
import type { ViewUsersPayload } from "@/users/interfaces"
import { User } from "@/users/model"

class ViewUsers {
    constructor(private readonly dbUser: typeof User) {}

    handle = async ({ query }: Context<ViewUsersPayload>) => {
        if (query?.roleId) {
            const users = await this.get_users_by_role(query.roleId)

            return {
                code: HttpStatus.OK,
                message: "Users Retrieved Successfully",
                data: users,
            }
        }

        const allUsers = await this.dbUser.findAll()

        return {
            code: HttpStatus.OK,
            message: "Users Retrieved Successfully",
            data: allUsers,
        }
    }

    private get_users_by_role = async (roleId: string) => {
        const users = await this.dbUser.findAll({
            include: [
                {
                    model: Role,
                    where: { id: roleId },
                    required: true,
                },
            ],
        })

        return users
    }
}

export const viewUsers = new ViewUsers(User)
