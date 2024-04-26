import { sequelize } from "@/core"
import { User } from "@/users/model"
import { DataTypes, ForeignKey, Model, UUIDV4, type CreationOptional, type InferAttributes, type InferCreationAttributes } from "sequelize"

export class Auth extends Model<InferAttributes<Auth>, InferCreationAttributes<Auth>> {
    declare id: CreationOptional<string>
    declare email: string
    declare password: CreationOptional<string>
    declare refreshToken: CreationOptional<string>
    declare refreshTokenExp: CreationOptional<Date>
    declare isVerified: CreationOptional<boolean>
    declare userId: ForeignKey<User["id"]>

    public readonly user?: User

}

Auth.init(
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: UUIDV4,
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
        modelName: "auth",
        tableName: "auth",
        sequelize,
        timestamps: true,
        freezeTableName: true,
    },
)
