'use strict';
      module.exports = {
          up: function(queryInterface, Sequelize) {
              return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
              .then(() => {
                  return queryInterface.createTable('rolePermissions',
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
                    "unique": "rolePermissions_permissionId_roleId_unique",
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE"
                },
                "roleId": {
                    "type": "UUID",
                    "allowNull": false,
                    "references": {
                        "model": "roles",
                        "key": "id"
                    },
                    "unique": "rolePermissions_permissionId_roleId_unique",
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
                  return queryInterface.dropTable('rolePermissions');
              })
              .then(() => {
                  return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
              });
          }
      };