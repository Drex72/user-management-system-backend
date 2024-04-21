import { NamePayload } from "@/auth/interfaces"
import { Role } from "@/auth/model"
import { BadRequestError, Context, HttpStatus, logger } from "@/core"

class CreateRole {
    constructor(private readonly dbRole: typeof Role) {}

    handle = async ({ input }: Context<NamePayload>) => {
        const { name } = input

        try {
            // Try to create the role. If it already exists, it will throw an error.
            const newRole = await this.dbRole.create({
                name: name.toLocaleUpperCase(),
            })

            logger.info("Role Created Successfully")

            return {
                code: HttpStatus.OK,
                message: "Role Created Successfully",
                data: newRole,
            }
        } catch (error: any) {
            // If the error is due to duplicate entry, handle it gracefully.
            if (error.name === "SequelizeUniqueConstraintError") {
                throw new BadRequestError("Role Exists!")
            } else {
                // If it's another type of error, re-throw it.
                throw error
            }
        }
    }
}

export const createRole = new CreateRole(Role)
