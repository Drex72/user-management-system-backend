import { Permission, Role } from "@/auth/model"
import { HttpStatus, logger } from "@/core"

class GetRoles {
    constructor(private readonly dbRole: typeof Role) {}

    handle = async () => {
        const roles = await this.dbRole.findAll({
            include: [Permission],
        })

        logger.info("Roles Retrieved Successfully")

        return {
            code: HttpStatus.OK,
            message: "Roles Retrieved Successfully",
            data: roles,
        }
    }
}

export const getRoles = new GetRoles(Role)
