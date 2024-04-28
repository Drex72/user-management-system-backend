import { sequelize } from "@/core"
import { User } from "@/users/model"
import { DataTypes, Model, type CreationOptional, type ForeignKey, type InferAttributes, type InferCreationAttributes } from "sequelize"
import { Training } from "./training.model"

export class TrainingStudents extends Model<InferAttributes<TrainingStudents>, InferCreationAttributes<TrainingStudents>> {
    declare id: CreationOptional<string>
    declare userId: ForeignKey<User["id"]>
    declare trainingId: ForeignKey<Training["id"]>
    declare completedTraining: CreationOptional<boolean>
    declare acceptanceMailSent: CreationOptional<boolean>
}

TrainingStudents.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            allowNull: false,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            references: {
                model: User,
                key: "id",
            },
        },
        trainingId: {
            type: DataTypes.UUID,
            references: {
                model: Training,
                key: "id",
            },
        },
        completedTraining: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        acceptanceMailSent: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        indexes: [
            {
                unique: true,
                fields: ["userId", "trainingId"],
            },
        ],
        modelName: "trainingStudents",
        tableName: "trainingStudents",
        sequelize,
        timestamps: true,
        freezeTableName: true,
    },
)
