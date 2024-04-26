import { sequelize } from "@/core"
import { User } from "./user.model";
import { Department } from "./department.model";
import { DataTypes, Model, UUIDV4, type CreationOptional, type InferAttributes, type InferCreationAttributes } from "sequelize"

export class UserDepartment extends Model<InferAttributes<UserDepartment>, InferCreationAttributes<UserDepartment>> {
    declare id: CreationOptional<string>;
    declare userId: string;
    declare departmentId: string;
}

UserDepartment.init(
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: UUIDV4
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            },
            comment: "User ID of the user",
        },
        departmentId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Department,
                key: 'id'
            }
        }
    },
    {
        indexes: [
            {
                unique: true,
                fields: ["id"]
            }
        ],
        modelName: "userDepartments",
        tableName: "userDepartments",
        sequelize,
        timestamps: true,
        freezeTableName: true
    }
);

User.belongsToMany(Department, { through: UserDepartment, foreignKey: "userId" })
Department.belongsToMany(User, { through: UserDepartment, foreignKey: "departmentId" })