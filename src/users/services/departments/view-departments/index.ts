import { HttpStatus } from "@/core"
import { Department } from "@/users/model"

class ViewDepartments {
    constructor(private readonly dbDepartment: typeof Department) {}

    handle = async () => {
        const allDepartments = await this.dbDepartment.findAll()

        return {
            code: HttpStatus.OK,
            message: "All Departments Retrieved Successfully",
            data: allDepartments,
        }
    }
}

export const viewDepartments = new ViewDepartments(Department)
