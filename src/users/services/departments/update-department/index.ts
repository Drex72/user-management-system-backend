import { BadRequestError, Context, HttpStatus } from "@/core"
import { UpdateDepartmentPayload } from "@/users/interfaces"
import { Department } from "@/users/model"

class UpdateDepartment {
    constructor(private readonly dbDepartment: typeof Department) {}

    handle = async ({ input, query }: Context<UpdateDepartmentPayload>) => {
        const { departmentId } = query

        if (!input) throw new BadRequestError("Please input a department name")

        const department = await this.dbDepartment.findOne({
            where: { id: departmentId },
        })

        if (!department) throw new BadRequestError("Invalid Department!")

        await this.dbDepartment.update({ ...input }, { where: { id: departmentId } })

        return {
            code: HttpStatus.OK,
            message: "Department Updated Successfully",
        }
    }
}

export const updateDepartment = new UpdateDepartment(Department)
