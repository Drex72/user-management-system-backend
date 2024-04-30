import { HttpStatus, type Context } from "@/core"
import type { GetDepartmentUsersPayload } from "@/users/interfaces"
import { User } from "@/users/model"
import { UserDepartment } from "@/users/model/userDepartment.model"

class GetDepartmentUsers {
    constructor(private readonly dbUserDepartment: typeof UserDepartment) {}

    handle = async ({ query }: Context<GetDepartmentUsersPayload>) => {
        const { departmentId } = query

        const departmentUsers = await this.dbUserDepartment.findAll({
            where: { departmentId },
         
        })

        return {
            code: HttpStatus.OK,
            message: "Department Users Retrieved Successfully",
            data: departmentUsers,
        }
    }
}

export const getDepartmentUsers = new GetDepartmentUsers(UserDepartment)
