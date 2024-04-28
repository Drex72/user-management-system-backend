import { sequelize } from "@/core"
import { DataTypes, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes } from "sequelize"

export class Training extends Model<InferAttributes<Training>, InferCreationAttributes<Training>> {
    declare id: CreationOptional<string>
    declare name: string
    declare startDate: Date
    declare endDate: Date
    declare isCompleted: CreationOptional<boolean>
}

Training.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        startDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },

        isCompleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        modelName: "trainings",
        tableName: "trainings",
        sequelize,
        timestamps: true,
        freezeTableName: true,
    },
)

// Hook to set isCompleted to false if endDate is equal to the current date
Training.beforeUpdate(async (training, options) => {
    if (training.changed("endDate") && training.endDate.toDateString() === new Date().toDateString()) {
        training.isCompleted = true
    }
})
