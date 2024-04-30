"use strict"

const bcrypt = require("bcrypt")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        const password = "Damilola&12"
        const hashedPassword = await bcrypt.hash(password, 12)

        await queryInterface.bulkInsert(
            "roles",
            [
                {
                    id: "e29c83bf-877e-41d5-9097-3374f99a4d1a",
                    name: "ADMIN",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: "59fd7b28-ca4d-4900-934d-379fa3a2d1de",
                    name: "DEVELOPER",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {},
        )

        await queryInterface.bulkInsert(
            "users",
            [
                {
                    id: "ae5248a5-eeff-4a81-85ad-8ea516aabbf6",
                    firstName: "John",
                    lastName: "Doe",
                    email: "johnnydoe@gmail.com",
                    emailVerified: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: "ad51e32c-5d79-45c2-b2e3-303d20d06997",
                    firstName: "Sarah",
                    lastName: "Janice",
                    email: "sarah@gmail.com",
                    emailVerified: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {},
        )

        await queryInterface.bulkInsert(
            "auth",
            [
                {
                    id: "196d89bb-8fb6-4eb2-9e10-71509bc7daa3",
                    password: hashedPassword,
                    email: "johnnydoe@gmail.com",
                    userId: "ae5248a5-eeff-4a81-85ad-8ea516aabbf6",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: "5b0d1b55-7b9e-4a86-a02a-c09e775f2191",
                    password: hashedPassword,
                    email: "sarah@gmail.com",
                    userId: "ad51e32c-5d79-45c2-b2e3-303d20d06997",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {},
        )

        await queryInterface.bulkInsert(
            "userRoles",
            [
                {
                    id: "44b05cd5-4835-4372-9a84-9588de6034df",
                    roleId: "e29c83bf-877e-41d5-9097-3374f99a4d1a",
                    userId: "ae5248a5-eeff-4a81-85ad-8ea516aabbf6",
                    active: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: "96c8d4b7-5239-4b57-a265-89e69a18df46",
                    roleId: "59fd7b28-ca4d-4900-934d-379fa3a2d1de",
                    userId: "ad51e32c-5d79-45c2-b2e3-303d20d06997",
                    active: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {},
        )
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("userRoles", null)
        await queryInterface.bulkDelete("auth", null)
        await queryInterface.bulkDelete("users", null)
        await queryInterface.bulkDelete("roles", null)
    },
}
