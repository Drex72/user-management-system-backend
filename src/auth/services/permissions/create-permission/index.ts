import { NamePayload } from "@/auth/interfaces"
import { Permission } from "@/auth/model"
import { BadRequestError, Context, HttpStatus, logger } from "@/core"

class CreatePermission {
    constructor(private readonly dbPermission: typeof Permission) {}

    handle = async ({ input }: Context<NamePayload>) => {
        const { name } = input

        try {
            // Try to create the Permission. If it already exists, it will throw an error.
            const newPermission = await this.dbPermission.create({
                name: name.toLocaleUpperCase(),
            })

            logger.info("Permission Created Successfully")

            return {
                code: HttpStatus.OK,
                message: "Permission Created Successfully",
                data: newPermission,
            }
        } catch (error: any) {
            // If the error is due to duplicate entry, handle it gracefully.
            if (error.name === "SequelizeUniqueConstraintError") {
                throw new BadRequestError("Permission Exists!")
            } else {
                // If it's another type of error, re-throw it.
                throw error
            }
        }
    }
}

export const createPermision = new CreatePermission(Permission)
