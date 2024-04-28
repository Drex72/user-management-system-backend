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
        await queryInterface.createTable("events", {
            id: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
            },
            name: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING,
            },
            description: {
                allowNull: false,
                type: Sequelize.TEXT,
                comment: "Description of the event",
            },
            photo: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    isUrl: true,
                },
                comment: "URL to event photo",
            },
            limit: {
                type: Sequelize.INTEGER,
                allowNull: true,
                validate: {
                    min: 0,
                },
                comment: "Maximum number of attendees",
            },
            inviteLink: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    isUrl: true,
                },
                comment: "Link to the event page",
            },
            inviteQrCode: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    isUrl: true,
                },
                comment: "Invitation QRCode to the event page",
            },
            date: {
                type: Sequelize.DATEONLY,
                allowNull: false,
                comment: "Date of the event",
            },
            time: {
                type: Sequelize.TIME,
                allowNull: false,
                comment: "Time of the event",
            },
            creatorId: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: true,

                comment: "ID of the Creator of the Event",
            },

            creatorType: {
                type: Sequelize.ENUM("user", "organization"),
                allowNull: true,

                comment: "Type of the Creator of the Event",
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
        await queryInterface.dropTable("events")
    },
}
