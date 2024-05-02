'use strict';
      module.exports = {
          up: function(queryInterface, Sequelize) {
              return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
              .then(() => {
                  return queryInterface.createTable('users',
                  {
                "id": {
                    "type": "UUID",
                    "allowNull": false,
                    "primaryKey": true,
                    "defaultValue": {}
                },
                "firstName": {
                    "type": "VARCHAR(255)",
                    "allowNull": false
                },
                "lastName": {
                    "type": "VARCHAR(255)",
                    "allowNull": false
                },
                "email": {
                    "type": "VARCHAR(255)",
                    "allowNull": false,
                    "unique": true
                },
                "phoneNumber": {
                    "type": "VARCHAR(255)",
                    "allowNull": true,
                    "unique": true
                },
                "emailVerified": {
                    "type": "BOOLEAN",
                    "defaultValue": false,
                    "allowNull": false
                },
                "phoneNumberVerified": {
                    "type": "BOOLEAN",
                    "defaultValue": false,
                    "allowNull": false
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
                'users',
                ['email']
                , {"indexName":"users_email","indicesType":"UNIQUE"}
            )
        })
        .then(() => {
            return queryInterface.addIndex(
                'users',
                ['id']
                , {"indexName":"users_id","indicesType":"UNIQUE"}
            )
        })
              .then(() => {
                  return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
              });
          },
          down: function(queryInterface, Sequelize) {
              return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
              .then(() => {
                  return queryInterface.dropTable('users');
              })
              .then(() => {
                  return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
              });
          }
      };