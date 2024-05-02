'use strict';
      module.exports = {
          up: function(queryInterface, Sequelize) {
              return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
              .then(() => {
                  return queryInterface.createTable('auth',
                  {
                "id": {
                    "type": "UUID",
                    "allowNull": false,
                    "primaryKey": true,
                    "defaultValue": {}
                },
                "email": {
                    "type": "VARCHAR(255)",
                    "allowNull": false,
                    "unique": true
                },
                "password": {
                    "type": "VARCHAR(255)",
                    "allowNull": false
                },
                "refreshToken": {
                    "type": "VARCHAR(600)",
                    "allowNull": true
                },
                "refreshTokenExp": {
                    "type": "TIMESTAMP WITH TIME ZONE",
                    "allowNull": true
                },
                "isVerified": {
                    "type": "BOOLEAN",
                    "defaultValue": false
                },
                "userId": {
                    "type": "UUID",
                    "allowNull": false,
                    "references": {
                        "model": "users",
                        "key": "id"
                    },
                    "onDelete": "NO ACTION",
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
                'auth',
                ['email']
                , {"indexName":"auth_email","indicesType":"UNIQUE"}
            )
        })
        .then(() => {
            return queryInterface.addIndex(
                'auth',
                ['id']
                , {"indexName":"auth_id","indicesType":"UNIQUE"}
            )
        })
              .then(() => {
                  return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
              });
          },
          down: function(queryInterface, Sequelize) {
              return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
              .then(() => {
                  return queryInterface.dropTable('auth');
              })
              .then(() => {
                  return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
              });
          }
      };