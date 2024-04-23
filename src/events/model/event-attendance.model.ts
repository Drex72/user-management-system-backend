import { sequelize } from "@/core"
import { User } from "@/users/model"
import { DataTypes, ForeignKey, Model, UUIDV4, type CreationOptional, type InferAttributes, type InferCreationAttributes } from "sequelize"
import { Event } from "./event.model"

const eventAttendanceStatus = ["registered", "attended"] as const

export type EventAttendanceStatus = (typeof eventAttendanceStatus)[number]

export class EventAttendance extends Model<InferAttributes<EventAttendance>, InferCreationAttributes<EventAttendance>> {
    declare id: CreationOptional<string>
    declare userId: ForeignKey<User["id"]>
    declare eventId: ForeignKey<Event["id"]>
    declare qrCode: string
    declare status: EventAttendanceStatus
    declare entryTime: CreationOptional<string>
}

EventAttendance.init(
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: UUIDV4,
        },

        userId: {
            type: DataTypes.UUID,
            allowNull: true,

            references: {
                model: User,
                key: "id",
            },

            comment: "User ID of the user",
        },

        eventId: {
            type: DataTypes.UUID,
            allowNull: true,

            references: {
                model: Event,
                key: "id",
            },

            comment: "Event ID of the event",
        },
        qrCode: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,

            validate: {
                isUrl: true,
            },
            comment: "Unique QR Code for this registration ",
        },
        status: {
            type: DataTypes.ENUM(...eventAttendanceStatus),
            allowNull: false,
            defaultValue: "registered",
            comment: "Status of the user for this event",
        },
        entryTime: {
            type: DataTypes.TIME,
            allowNull: false,
            comment: "Time of the event",
        },
    },
    {
        modelName: "eventAttendance",
        tableName: "eventAttendance",
        sequelize,
        timestamps: true,
        freezeTableName: true,
    },
)
