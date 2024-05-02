'use strict';
      module.exports = {
          up: function(queryInterface, Sequelize) {
              return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
              .then(() => {
                  return queryInterface.createTable('userDepartments',
                  {
                "id": {
                    "type": "UUID",
                    "allowNull": false,
                    "primaryKey": true,
                    "defaultValue": {}
                },
                "userId": {
                    "type": "UUID",
                    "allowNull": false,
                    "references": {
                        "model": "users",
                        "key": "id"
                    },
                    "comment": "User ID of the user",
                    "unique": "userDepartments_departmentId_userId_unique",
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE"
                },
                "departmentId": {
                    "type": "UUID",
                    "allowNull": false,
                    "references": {
                        "model": "departments",
                        "key": "id"
                    },
                    "unique": "userDepartments_departmentId_userId_unique",
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
            return queryInterface.addIndex(
                'userDepartments',
                ['id']
                , {"indexName":"user_departments_id","indicesType":"UNIQUE"}
            )
        })
              .then(() => {
                  return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
              });
          },
          down: function(queryInterface, Sequelize) {
              return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
              .then(() => {
                  return queryInterface.dropTable('userDepartments');
              })
              .then(() => {
                  return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
              });
          }
      };