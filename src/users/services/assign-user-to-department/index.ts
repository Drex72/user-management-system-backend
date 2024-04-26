import { BadRequestError, HttpStatus, type Context } from "@/core"
import type { UserDepartmentPayload } from "@/users/interfaces"
import { Department, User } from "@/users/model"
import { UserDepartment } from "@/users/model/userDepartment.model"

class AssignUserDepartment {
    constructor(
        private readonly dbUser: typeof User,
        private readonly dbDepartment: typeof Department,
        private readonly dbUserDepartment: typeof UserDepartment
    ) { }
    handle = async ({ input, query }: Context<UserDepartmentPayload>) => {
        const { departmentId } = query

        const department = await this.dbDepartment.findOne({
            where: { id: departmentId }
        })

        if (!department) throw new BadRequestError("Department does not yet exist")

        const user = await this.dbUser.findOne({
            where: { id: input.userId }
        })
        if (!user) throw new BadRequestError("User details not found")

        const registeredDepartment = await this.dbUserDepartment.create({
            userId: user.id,
            departmentId: department.id,
        })
        return {
            code: HttpStatus.OK,
            message: "Assignment of User to Department successfully",
            data: registeredDepartment
        }
    }
}

export const userDepartment = new AssignUserDepartment(User, Department, UserDepartment)