import { sequelize } from "@/core"
import { User } from "@/users/model"
import { DataTypes, Model, UUIDV4, type CreationOptional, type ForeignKey, type InferAttributes, type InferCreationAttributes } from "sequelize"
import { Permission } from "./permission.model"

export class UserPermissions extends Model<InferAttributes<UserPermissions>, InferCreationAttributes<UserPermissions>> {
    declare id: CreationOptional<string>
    declare permissionId: ForeignKey<Permission["id"]>
    declare userId: ForeignKey<User["id"]>
}

UserPermissions.init(
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

        userId: {
            type: DataTypes.UUID,
            allowNull: true,

            references: {
                model: User,
                key: "id",
            },
        },
    },
    {
        modelName: "userPermissions",
        tableName: "userPermissions",
        sequelize,
        timestamps: true,
        freezeTableName: true,
    },
)
