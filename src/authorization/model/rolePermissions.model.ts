import { sequelize } from "@/core"
import { DataTypes, Model, UUIDV4, type CreationOptional, type ForeignKey, type InferAttributes, type InferCreationAttributes } from "sequelize"
import { Permission } from "./permission.model"
import { Role } from "./role.model"

export class RolePermissions extends Model<InferAttributes<RolePermissions>, InferCreationAttributes<RolePermissions>> {
    declare id: CreationOptional<string>
    declare permissionId: ForeignKey<Permission["id"]>
    declare roleId: ForeignKey<Role["id"]>
}

RolePermissions.init(
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: UUIDV4,
        },
        permissionId: {
            type: DataTypes.UUID,
            allowNull: true,

            references: {
                model: Permission,
                key: "id",
            },
        },

        roleId: {
            type: DataTypes.UUID,
            allowNull: true,

            references: {
                model: Role,
                key: "id",
            },
        },
    },
    {
        modelName: "rolePermissions",
        tableName: "rolePermissions",
        sequelize,
        timestamps: true,
        freezeTableName: true,
    },
)
