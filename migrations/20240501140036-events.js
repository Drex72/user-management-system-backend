'use strict';
      module.exports = {
          up: function(queryInterface, Sequelize) {
              return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
              .then(() => {
                  return queryInterface.createTable('events',
                  {
                "id": {
                    "type": "UUID",
                    "allowNull": false,
                    "primaryKey": true,
                    "defaultValue": {}
                },
                "name": {
                    "type": "VARCHAR(255)",
                    "allowNull": false,
                    "unique": true
                },
                "description": {
                    "type": "TEXT",
                    "allowNull": false,
                    "comment": "Description of the event"
                },
                "photo": {
                    "type": "VARCHAR(255)",
                    "allowNull": false,
                    "validate": {
                        "isUrl": true
                    },
                    "comment": "URL to event photo"
                },
                "limit": {
                    "type": "INTEGER",
                    "allowNull": true,
                    "validate": {
                        "min": 0
                    },
                    "comment": "Maximum number of attendees"
                },
                "inviteLink": {
                    "type": "VARCHAR(255)",
                    "allowNull": false,
                    "validate": {
                        "isUrl": true
                    },
                    "comment": "Link to the event page"
                },
                "inviteQrCode": {
                    "type": "VARCHAR(255)",
                    "allowNull": false,
                    "validate": {
                        "isUrl": true
                    },
                    "comment": "Invitation QRCode to the event page"
                },
                "date": {
                    "type": "DATE",
                    "allowNull": false,
                    "comment": "Date of the event"
                },
                "time": {
                    "type": "TIME",
                    "allowNull": false,
                    "comment": "Time of the event"
                },
                "creatorId": {
                    "type": "INTEGER",
                    "allowNull": true,
                    "comment": "ID of the Creator of the Event"
                },
                "creatorType": {
                    "type": "ENUM",
                    "allowNull": true,
                    "comment": "Type of the Creator of the Event",
                    "values": [
                        "user",
                        "organization"
                    ]
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
                  return queryInterface.dropTable('events');
              })
              .then(() => {
                  return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
              });
          }
      };