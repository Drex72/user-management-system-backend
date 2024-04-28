import { BadRequestError, HttpStatus, type Context } from "@/core"
import type { UserDepartmentPayload } from "@/users/interfaces"
import { Department, User } from "@/users/model"
import { UserDepartment } from "@/users/model/userDepartment.model"

class AssignUserDepartment {
    constructor(
        private readonly dbUser: typeof User,
        private readonly dbDepartment: typeof Department,
        private readonly dbUserDepartment: typeof UserDepartment,
    ) {}

    handle = async ({ input, query }: Context<UserDepartmentPayload>) => {
        const { departmentId } = query
        const { userId } = input

        // Attempt to fetch both the user and the department in parallel
        const [department, user] = await Promise.all([
            this.dbDepartment.findOne({ where: { id: departmentId } }),
            this.dbUser.findOne({ where: { id: userId } }),
        ])

        // Validate existence of department and user
        if (!department) {
            throw new BadRequestError("Department does not exist!")
        }

        if (!user) {
            throw new BadRequestError("Invalid user!")
        }

        // Check if the user is already registered in the department
        const existingUserDepartment = await this.dbUserDepartment.findOne({
            where: { userId: user.id, departmentId: department.id },
        })

        if (existingUserDepartment) throw new BadRequestError(`User ${user.firstName} already exists in department ${department.name}`)

        const registeredDepartment = await this.dbUserDepartment.create({
            userId: user.id,
            departmentId: department.id,
        })

        return {
            code: HttpStatus.OK,
            message: "Assignment of User to Department successfully",
            data: registeredDepartment,
        }
    }
}

export const assignUserToDepartment = new AssignUserDepartment(User, Department, UserDepartment)
