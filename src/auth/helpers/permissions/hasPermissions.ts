import { cache } from "@/app/app-cache"

export const hasPermission = async (userId: string, permission: string): Promise<boolean> => {
    const userPermissions = await cache.get(`${userId}-permissions`)

    if (!userPermissions) return false

    if (userPermissions.includes(permission)) return true

    return false
}
