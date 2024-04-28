"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("auth", {
            id: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
            },

            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },

            password: {
                type: Sequelize.STRING,
                allowNull: false,
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
            userId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
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
        await queryInterface.dropTable("auth")
    },
}
