import { cache } from "@/app/app-cache"
import { UserPermissions } from "../../model"

export const getPermissions = async (userId: string, userRole: string) => {
    try {
        const response = await UserPermissions.findAll({
            where: { userId: userId },
        })

        const userPermissions = response.map((permission) => permission.permissionId)

        await cache.set(`${userId}-permissions`, JSON.stringify(userPermissions))
    } catch (error) {}
}
