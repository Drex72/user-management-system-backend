'use strict';
      module.exports = {
          up: function(queryInterface, Sequelize) {
              return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
              .then(() => {
                  return queryInterface.createTable('trainings',
                  {
                "id": {
                    "type": "UUID",
                    "defaultValue": {},
                    "allowNull": false,
                    "primaryKey": true
                },
                "name": {
                    "type": "VARCHAR(255)",
                    "allowNull": false,
                    "unique": true
                },
                "startDate": {
                    "type": "DATE",
                    "allowNull": false
                },
                "endDate": {
                    "type": "DATE",
                    "allowNull": false
                },
                "isCompleted": {
                    "type": "BOOLEAN",
                    "defaultValue": false
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
                  return queryInterface.dropTable('trainings');
              })
              .then(() => {
                  return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
              });
          }
      };