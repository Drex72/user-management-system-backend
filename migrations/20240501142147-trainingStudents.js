'use strict';
      module.exports = {
          up: function(queryInterface, Sequelize) {
              return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
              .then(() => {
                  return queryInterface.createTable('trainingStudents',
                  {
                "id": {
                    "type": "UUID",
                    "defaultValue": {},
                    "allowNull": false,
                    "primaryKey": true
                },
                "userId": {
                    "type": "UUID",
                    "references": {
                        "model": "users",
                        "key": "id"
                    }
                },
                "trainingId": {
                    "type": "UUID",
                    "references": {
                        "model": "trainings",
                        "key": "id"
                    }
                },
                "completedTraining": {
                    "type": "BOOLEAN",
                    "defaultValue": false
                },
                "acceptanceMailSent": {
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
            return queryInterface.addIndex(
                'trainingStudents',
                ['userId','trainingId']
                , {"indexName":"training_students_user_id_training_id","indicesType":"UNIQUE"}
            )
        })
              .then(() => {
                  return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
              });
          },
          down: function(queryInterface, Sequelize) {
              return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
              .then(() => {
                  return queryInterface.dropTable('trainingStudents');
              })
              .then(() => {
                  return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
              });
          }
      };