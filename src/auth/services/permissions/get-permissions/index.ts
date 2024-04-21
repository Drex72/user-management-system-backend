import { Permission } from "@/auth/model"
import { HttpStatus, logger } from "@/core"

class GetPermissions {
    constructor(private readonly dbPermission: typeof Permission) {}

    handle = async () => {
        const permissions = await this.dbPermission.findAll()

        logger.info("Permissions Retrieved Successfully")

        return {
            code: HttpStatus.OK,
            message: "Permissions Retrieved Successfully",
            data: permissions,
        }
    }
}

export const getPermissions = new GetPermissions(Permission)
