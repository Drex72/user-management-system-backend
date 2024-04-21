import { User } from "@/authentication/model"
import { Permission, Role, RolePermissions, UserPermissions } from "@/authorization/model"

export const handleSetAssociations = () => {
    // User.belongsTo(Role)
    Role.hasMany(User)

    Role.belongsToMany(Permission, { through: RolePermissions })
    Permission.belongsToMany(Role, { through: RolePermissions })

    User.belongsToMany(Permission, { through: UserPermissions })
    Permission.belongsToMany(User, { through: UserPermissions })
}
