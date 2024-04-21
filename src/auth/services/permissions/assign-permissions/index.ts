import { AssignPermissionsPayload } from "@/auth/interfaces"
import { Permission, Role, RolePermissions, UserPermissions } from "@/auth/model"
import { BadRequestError, HttpStatus, type Context } from "@/core"
import { User } from "@/users/model"

class AssignPermissions {
    constructor(
        private readonly dbUser: typeof User,
        private readonly dbRole: typeof Role,
        private readonly dbUserPermissions: typeof UserPermissions,
        private readonly dbRolePermissions: typeof RolePermissions,
        private readonly dbPermission: typeof Permission,
    ) {}

    handle = async ({ query, input }: Context<AssignPermissionsPayload>) => {
        const { roleId, userId } = query

        const { permissionIds } = input

        if (userId) {
            return this.assignPermissionsToUser(userId, permissionIds)
        }

        if (roleId) {
            return this.assignPermissionsToRole(roleId, permissionIds)
        }

        throw new BadRequestError("Must provide userId or roleId")
    }

    private assignPermissionsToRole = async (roleId: string, permissionIds: string[]) => {
        const roleExists = await this.dbRole.findOne({
            where: { id: roleId },
        })

        if (!roleExists) throw new BadRequestError("Invalid Role Id")

        // Fetch all permissions at once
        const permissions = await this.dbPermission.findAll({
            where: { id: permissionIds },
        })

        // Extract valid and invalid permission IDs
        const validPermissionIds = permissions.map((permission) => permission.id)

        const invalidPermissions = permissionIds.filter((permissionId) => !validPermissionIds.includes(permissionId))

        // Check if all permission IDs are valid
        if (invalidPermissions.length > 0) {
            throw new BadRequestError("Invalid Permission Ids: " + invalidPermissions.join(", "))
        }

        // Create payload for bulk insertion
        const payload = permissionIds.map((permissionId) => ({
            roleId,
            permissionId,
        }))

        // Bulk create user permissions
        const response = await this.dbRolePermissions.bulkCreate(payload)

        return {
            code: HttpStatus.OK,
            message: "Permissions Assigned Successfully",
            data: response,
        }
    }

    private assignPermissionsToUser = async (userId: string, permissionIds: string[]) => {
        const userExists = await this.dbUser.findOne({
            where: { id: userId },
        })

        if (!userExists) throw new BadRequestError("Invalid User Id")

        // Fetch all permissions at once
        const permissions = await this.dbPermission.findAll({
            where: { id: permissionIds },
        })

        // Extract valid and invalid permission IDs
        const validPermissionIds = permissions.map((permission) => permission.id)

        const invalidPermissions = permissionIds.filter((permissionId) => !validPermissionIds.includes(permissionId))

        // Check if all permission IDs are valid
        if (invalidPermissions.length > 0) {
            throw new BadRequestError("Invalid Permission Ids: " + invalidPermissions.join(", "))
        }

        // Create payload for bulk insertion
        const payload = permissionIds.map((permissionId) => ({
            userId,
            permissionId,
        }))

        // Bulk create user permissions
        const response = await this.dbUserPermissions.bulkCreate(payload)

        return {
            code: HttpStatus.OK,
            message: "Permissions Assigned Successfully",
            data: response,
        }
    }
}

export const assignPermissions = new AssignPermissions(User, Role, UserPermissions, RolePermissions, Permission)
