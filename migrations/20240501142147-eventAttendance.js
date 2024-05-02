'use strict';
      module.exports = {
          up: function(queryInterface, Sequelize) {
              return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
              .then(() => {
                  return queryInterface.createTable('eventAttendance',
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
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE"
                },
                "eventId": {
                    "type": "UUID",
                    "allowNull": false,
                    "references": {
                        "model": "events",
                        "key": "id"
                    },
                    "comment": "Event ID of the event"
                },
                "qrCode": {
                    "type": "VARCHAR(255)",
                    "allowNull": false,
                    "unique": true,
                    "validate": {
                        "isUrl": true
                    },
                    "comment": "Unique QR Code for this registration "
                },
                "status": {
                    "type": "ENUM",
                    "allowNull": false,
                    "defaultValue": "registered",
                    "comment": "Status of the user for this event",
                    "values": [
                        "registered",
                        "attended"
                    ]
                },
                "entryTime": {
                    "type": "TIME",
                    "allowNull": true,
                    "comment": "Time of the event"
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
                  return queryInterface.dropTable('eventAttendance');
              })
              .then(() => {
                  return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
              });
          }
      };