import { Permission, Role, RolePermissions, UserPermissions, UserRoles } from "@/auth/model"
import { User } from "@/users/model"

export const handleSetAssociations = () => {
    User.belongsToMany(Role, { through: UserRoles })
    Role.belongsToMany(User, { through: UserRoles })

    Role.belongsToMany(Permission, { through: RolePermissions })
    Permission.belongsToMany(Role, { through: RolePermissions })

    User.belongsToMany(Permission, { through: UserPermissions })
    Permission.belongsToMany(User, { through: UserPermissions })
}
