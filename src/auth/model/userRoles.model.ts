import { sequelize } from "@/core"
import { User } from "@/users/model"
import { DataTypes, Model, UUIDV4, type CreationOptional, type ForeignKey, type InferAttributes, type InferCreationAttributes } from "sequelize"
import { Role } from "./role.model"

export class UserRoles extends Model<InferAttributes<UserRoles>, InferCreationAttributes<UserRoles>> {
    declare id: CreationOptional<string>
    declare roleId: ForeignKey<Role["id"]>
    declare userId: ForeignKey<User["id"]>
    declare active: boolean
}

UserRoles.init(
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: UUIDV4,
        },
        roleId: {
            type: DataTypes.UUID,
            allowNull: true,

            references: {
                model: Role,
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

        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        modelName: "userRoles",
        tableName: "userRoles",
        sequelize,
        timestamps: true,
        freezeTableName: true,
    },
)
