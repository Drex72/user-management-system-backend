'use strict';
      module.exports = {
          up: function(queryInterface, Sequelize) {
              return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
              .then(() => {
                  return queryInterface.createTable('userPermissions',
                  {
                "id": {
                    "type": "UUID",
                    "allowNull": false,
                    "primaryKey": true,
                    "defaultValue": {}
                },
                "permissionId": {
                    "type": "UUID",
                    "allowNull": false,
                    "references": {
                        "model": "permissions",
                        "key": "id"
                    },
                    "unique": "userPermissions_permissionId_userId_unique",
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
                    "unique": "userPermissions_permissionId_userId_unique",
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE"
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
                  return queryInterface.dropTable('userPermissions');
              })
              .then(() => {
                  return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
              });
          }
      };