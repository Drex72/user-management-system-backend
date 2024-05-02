'use strict';
      module.exports = {
          up: function(queryInterface, Sequelize) {
              return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
              .then(() => {
                  return queryInterface.createTable('userRoles',
                  {
                "id": {
                    "type": "UUID",
                    "allowNull": false,
                    "primaryKey": true,
                    "defaultValue": {}
                },
                "roleId": {
                    "type": "UUID",
                    "allowNull": false,
                    "references": {
                        "model": "roles",
                        "key": "id"
                    },
                    "unique": "userRoles_roleId_userId_unique",
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE"
                },
                "userId": {
                    "type": "UUID",
                    "allowNull": false,
                    "references": {
                        "model": "users",
                        "key": "id"
                    },
                    "unique": "userRoles_roleId_userId_unique",
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE"
                },
                "active": {
                    "type": "BOOLEAN",
                    "allowNull": false,
                    "defaultValue": true
                },
                "createdAt": {
                    "type": "TIMESTAMP WITH TIME ZONE",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": "TIMESTAMP WITH TIME ZONE",
                    "allowNull": false
                }
            })
              })

              .then(() => {
                  return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
              });
          },
          down: function(queryInterface, Sequelize) {
              return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
              .then(() => {
                  return queryInterface.dropTable('userRoles');
              })
              .then(() => {
                  return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
              });
          }
      };