import { sequelize } from "@/core"
import { DataTypes, Model, UUIDV4, type CreationOptional, type ForeignKey, type InferAttributes, type InferCreationAttributes } from "sequelize"
import { Permission } from "./permission.model"
import { Role } from "./role.model"

export class RolePermissions extends Model<InferAttributes<RolePermissions>, InferCreationAttributes<RolePermissions>> {
    declare id: CreationOptional<string>
    declare permissionId: ForeignKey<Permission["id"]>
    declare roleId: ForeignKey<Role["id"]>

    public declare readonly role?: Role
    public declare readonly permission?: Permission

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
        defaultScope: {
            include: [
                { model: Role, as: "role" },
                { model: Permission, as: "permission" },
            ],
        },
        modelName: "rolePermissions",
        tableName: "rolePermissions",
        sequelize,
        timestamps: true,
        freezeTableName: true,
    },
)
