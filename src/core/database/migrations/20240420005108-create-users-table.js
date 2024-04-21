"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("users", {
            id: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
            },
            firstName: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            lastName: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            email: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING,
            },
            phoneNumber: {
                allowNull: true,
                unique: true,
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            emailVerified: {
                allowNull: false,
                defaultValue: false,
                type: Sequelize.BOOLEAN,
            },
            phoneNumberVerified: {
                allowNull: false,
                defaultValue: false,
                type: Sequelize.BOOLEAN,
            },
            refreshToken: {
                type: Sequelize.STRING(600),
                allowNull: true,
            },
            refreshTokenExp: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            isVerified: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
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
        await queryInterface.dropTable("users")
    },
}
