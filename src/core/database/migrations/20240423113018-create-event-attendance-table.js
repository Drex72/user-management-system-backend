"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable("eventAttendance", {
            id: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
            },
            userId: {
                type: Sequelize.UUID,
                allowNull: true,

                references: {
                    model: "users",
                    key: "id",
                },

                comment: "User ID of the user",
            },

            eventId: {
                type: Sequelize.UUID,
                allowNull: true,

                references: {
                    model: "events",
                    key: "id",
                },

                comment: "Event ID of the event",
            },
            qrCode: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,

                validate: {
                    isUrl: true,
                },
                comment: "Unique QR Code for this registration ",
            },
            status: {
                type: Sequelize.ENUM("registered", "attended"),
                allowNull: false,
                defaultValue: "registered",
                comment: "Status of the user for this event",
            },
            entryTime: {
                type: Sequelize.TIME,
                allowNull: true,
                comment: "Time of the event",
            },
            createdAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
                allowNull: false,
            },
        })
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.dropTable("eventAttendance")
    },
}
