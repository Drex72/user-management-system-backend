import { Role } from "@/auth/model"
import { sequelize } from "@/core"
import { DataTypes, Model, UUIDV4, type CreationOptional, type InferAttributes, type InferCreationAttributes } from "sequelize"

export const user_roles = ["SUPER ADMIN", "ADMIN", "USER", "DEVELOPER"] as const

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<string>
    declare firstName: string
    declare lastName: string
    declare email: string
    declare phoneNumber: CreationOptional<string>
    declare password: CreationOptional<string>
    declare emailVerified: CreationOptional<boolean>
    declare phoneNumberVerified: CreationOptional<boolean>
    declare refreshToken: CreationOptional<string>
    declare refreshTokenExp: CreationOptional<Date>
    declare isVerified: CreationOptional<boolean>

    public readonly roles?: Role[]
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: UUIDV4,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        emailVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        phoneNumberVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        refreshToken: {
            type: DataTypes.STRING(600),
            allowNull: true,
        },
        refreshTokenExp: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },

    {
        scopes: {
            withPassword: {
                attributes: {
                    include: ["password"],
                },
            },
            withRefreshToken: {
                attributes: {
                    include: ["refreshToken", "refreshTokenExp"],
                },
            },
        },
        indexes: [
            {
                unique: true,
                fields: ["email"],
            },
            {
                unique: true,
                fields: ["id"],
            },
        ],
        modelName: "users",
        tableName: "users",
        sequelize,
        timestamps: true,
        freezeTableName: true,
    },
)
