import { sequelize } from "@/core"
import { DataTypes, Model, UUIDV4, type CreationOptional, type InferAttributes, type InferCreationAttributes } from "sequelize"

export class Permission extends Model<InferAttributes<Permission>, InferCreationAttributes<Permission>> {
    declare id: CreationOptional<string>
    declare name: string
}

Permission.init(
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        modelName: "permissions",
        tableName: "permissions",
        sequelize,
        timestamps: true,
        freezeTableName: true,
    },
)
