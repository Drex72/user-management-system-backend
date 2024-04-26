import { sequelize } from "@/core"
import { DataTypes, Model, UUIDV4, type CreationOptional, type InferAttributes, type InferCreationAttributes } from "sequelize"

export class Department extends Model<InferAttributes<Department>, InferCreationAttributes<Department>> {
    declare id: CreationOptional<string>
    declare departmentName: string
}

Department.init(
    {
        id: {
            type: DataTypes.UUID,
            allowNull: true,
            primaryKey: true,
            defaultValue: UUIDV4
        },
        departmentName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        indexes: [
            {
                unique: true,
                fields: ["id"]
            }
        ],
        modelName: "departments",
        tableName: "departments",
        sequelize,
        timestamps: true,
        freezeTableName: true
    }
)