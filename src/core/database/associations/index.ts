import { User } from "@/users/model"
import { Permission, Role, RolePermissions, UserPermissions } from "@/auth/model"

export const handleSetAssociations = () => {
    User.belongsTo(Role, { foreignKey: "roleId", as: "role" })
    Role.hasMany(User)

    Role.belongsToMany(Permission, { through: RolePermissions })
    Permission.belongsToMany(Role, { through: RolePermissions })

    User.belongsToMany(Permission, { through: UserPermissions })
    Permission.belongsToMany(User, { through: UserPermissions })
}
