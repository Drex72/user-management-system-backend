import fs from "fs"
import path from "path"
import * as pg from "pg"
import { Sequelize } from "sequelize"
import { config } from "./config"

const { dbHost, dbName, dbPassword, dbType, dbUser } = config.db

export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbType,
    dialectModule: pg,
    omitNull: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    sync: { alter: { drop: true } },
    dialectOptions: { ssl: { require: true } },
    ssl: true,
})

// Still under development (Work on later)
// Reference this for adding association order export
// https://gist.github.com/manuelbieh/ae3b028286db10770c81?permalink_comment_id=3818611#gistcomment-3818611
class DBModelsToMigrations {
    private readonly exportOrder = {}

    public async main() {
        const models = await this.importModels(".")

        for (let model of models) {
            let attributes = model.rawAttributes

            for (let column in attributes) {
                console.log(attributes[column].type)
                delete attributes[column].Model
                delete attributes[column].fieldName
                delete attributes[column].field

                for (let property in attributes[column]) {
                    if (property.startsWith("_")) {
                        delete attributes[column][property]
                    }
                }

                if (typeof attributes[column]["type"] !== "undefined") {
                    if (
                        typeof attributes[column]["type"]["options"] !== "undefined" &&
                        typeof attributes[column]["type"]["options"].toString === "function"
                    ) {
                        attributes[column]["type"]["options"] = attributes[column]["type"]["options"].toString(sequelize)
                    }

                    if (typeof attributes[column]["type"].toString === "function") {
                        attributes[column]["type"] = attributes[column]["type"].toString(sequelize)
                    }
                }
            }

            let schema = JSON.stringify(attributes, null, 4)
            let tableName = model.tableName
            let indexes = ["\n"]

            if (model.options.indexes.length) {
                model.options.indexes.forEach((obj: any) => {
                    indexes.push("        .then(() => {")
                    indexes.push("            return queryInterface.addIndex(")
                    indexes.push(`                '${tableName}',`)
                    indexes.push(`                ['${obj.fields.join("','")}']`)

                    let opts: any = {}
                    if (obj.name) {
                        opts.indexName = obj.name
                    }
                    if (obj.unique === true) {
                        opts.indicesType = "UNIQUE"
                    }
                    if (obj.method === true) {
                        opts.indexType = obj.method
                    }
                    if (Object.keys(opts).length) {
                        indexes.push(`                , ${JSON.stringify(opts)}`)
                    }

                    indexes.push("            )")
                    indexes.push("        })")
                })
            }

            schema = schema
                ?.split("\n")
                ?.map((line) => "            " + line)
                ?.join("\n")

            let template = `'use strict';
      module.exports = {
          up: function(queryInterface, Sequelize) {
              return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
              .then(() => {
                  return queryInterface.createTable('${tableName}',
      ${schema})
              })${indexes.join("\n")}
              .then(() => {
                  return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
              });
          },
          down: function(queryInterface, Sequelize) {
              return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
              .then(() => {
                  return queryInterface.dropTable('${tableName}');
              })
              .then(() => {
                  return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
              });
          }
      };`

            let d = new Date()

            let filename =
                [d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()]
                    .map((num) => (num <= 60 && (num + 100).toString().substring(1)) || num)
                    .join("") + `-${model.tableName}`

            const migrationPath = `./migrations/${filename}.js`

            fs.writeFileSync(migrationPath, template)
        }
    }

    private async importModels(dir: string) {
        // Ensure the directory path is absolute
        const modelsDir = path.resolve(__dirname, dir)

        const modelFiles = this.findModelFiles(modelsDir)

        const models = await Promise.all(modelFiles.map((file) => this.loadModel(file)))

        // Filter out any nulls in case some files failed to import
        return models.flat().filter((model) => model !== null)
    }

    private async loadModel(file: string): Promise<any | null> {
        try {
            const module = await import(file)

            const modelFunctions = Object.keys(module)
                .filter((key) => typeof module[key] === "function")
                .map((key) => {
                    return module[key]
                })

            return modelFunctions.length > 0 ? modelFunctions : null
        } catch (error) {
            console.error(`Error loading model from file ${file}:`, error)
            return null
        }
    }

    private findModelFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
        const files = fs.readdirSync(dirPath)

        files.forEach((file) => {
            const fullPath = dirPath + "/" + file

            if (fs.statSync(fullPath).isDirectory()) {
                arrayOfFiles = this.findModelFiles(fullPath, arrayOfFiles)
            } else if (file.endsWith(".model.js")) {
                arrayOfFiles.push(path.join(dirPath, file))
            }
        })

        return arrayOfFiles
    }
}
