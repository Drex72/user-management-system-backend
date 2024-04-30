import { BadRequestError, HttpStatus, type Context } from "@/core"
import type { CreateDepartmentPayload } from "@/users/interfaces"
import { Department } from "@/users/model"

class CreateDepartment {
    constructor(private readonly dbDepartment: typeof Department) {}

    handle = async ({ input }: Context<CreateDepartmentPayload>) => {
        const { name } = input

        const department = await this.dbDepartment.findOne({
            where: { name: name.toLocaleUpperCase() },
        })

        if (department) throw new BadRequestError(`Department with name ${name} already exists!`)

        const createdDepartment = await this.dbDepartment.create({ name: name.toLocaleUpperCase() })

        return {
            code: HttpStatus.CREATED,
            message: "Department Created Successfully",
            data: createdDepartment,
        }
    }
}

export const createDepartment = new CreateDepartment(Department)
