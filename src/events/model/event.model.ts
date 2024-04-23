import { sequelize } from "@/core"
import { DataTypes, Model, UUIDV4, type CreationOptional, type InferAttributes, type InferCreationAttributes } from "sequelize"

export class Event extends Model<InferAttributes<Event>, InferCreationAttributes<Event>> {
    declare id: CreationOptional<string>
    declare name: string
    declare description: string
    declare photo: CreationOptional<string>
    declare limit: CreationOptional<number>
    declare inviteLink: string
    declare date: Date
    declare time: string
}

Event.init(
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
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            comment: "Description of the event",
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true,
            },
            comment: "URL to event photo",
        },
        limit: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                min: 0,
            },
            comment: "Maximum number of attendees",
        },
        inviteLink: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true,
            },
            comment: "Link to the event page",
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            comment: "Date of the event",
        },
        time: {
            type: DataTypes.TIME,
            allowNull: false,
            comment: "Time of the event",
        },
    },
    {
        modelName: "events",
        tableName: "events",
        sequelize,
        timestamps: true,
        freezeTableName: true,
    },
)
