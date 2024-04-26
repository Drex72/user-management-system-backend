import { BadRequestError, ForbiddenError, HttpStatus, logger, sequelize, type Context } from "@/core"
import type { CreateDepartmentPayload } from "@/users/interfaces"
import { Department } from "@/users/model"

class CreateDepartment {
    constructor(private readonly dbDepartment: typeof Department) { }

    handle = async ({ input }: Context<CreateDepartmentPayload>) => {
        const { departmentName } = input

        const department = await this.dbDepartment.findOne({
            where: { departmentName }
        })
        if (departmentName) throw new BadRequestError("Department already exist")
        const dbTransaction = await sequelize.transaction()
        try {
            const createdDepartment = await this.dbDepartment.create(input)
            dbTransaction.commit()
            return {
                code: HttpStatus.OK,
                message: "Department Created Successfully",
                data: createdDepartment
            }
        } catch (error: any) {
            dbTransaction.rollback()
            logger.error(error?.message || "Transaction failed, rolled back all operations")
            throw new Error("Error while creating Department")
        }
    }
}

export const createDepartment = new CreateDepartment(Department)