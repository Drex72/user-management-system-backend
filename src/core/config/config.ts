import * as dotenv from "dotenv"
import Joi from "joi"
import type { Dialect } from "sequelize"

dotenv.config()

type INodeEnv = "development" | "production" | "staging"

// Define validation schema for environment variables
const envSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid("development", "production", "staging").required(),
        PORT: Joi.number().required(),

        ACCESS_TOKEN_SECRET: Joi.string().required(),
        ACCESS_TOKEN_EXP: Joi.string().required(),
        REFRESH_TOKEN_SECRET: Joi.string().allow("").required(),
        REFRESH_TOKEN_EXP: Joi.string().required(),
        ENCRYPTOR_SECRET_KEY: Joi.string().required(),

        CLOUDINARY_NAME: Joi.string().required(),
        CLOUDINARY_API_KEY: Joi.string().required(),
        CLOUDINARY_API_SECRET: Joi.string().required(),

        DATABASE_NAME: Joi.string().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().allow("").required(),
        DATABASE_TYPE: Joi.string().required(),

        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.string().required(),
        REDIS_PASSWORD: Joi.string().required(),

        SENDGRID_API_KEY: Joi.string().required(),
        SENDGRID_EMAIL: Joi.string().required(),

        LIVE_ORIGIN: Joi.alternatives().conditional("NODE_ENV", {
            is: "production",
            then: Joi.string().required(),
            otherwise: Joi.optional(),
        }),

        STAGING_ORIGIN: Joi.alternatives().conditional("NODE_ENV", {
            is: "staging",
            then: Joi.string().required(),
            otherwise: Joi.optional(),
        }),

        DEV_ORIGIN: Joi.alternatives().conditional("NODE_ENV", {
            is: "development",
            then: Joi.string().required(),
            otherwise: Joi.optional(),
        }),
    })
    .unknown()

// Validate environment variables against the schema
const { value: validatedEnvVars, error: validationError } = envSchema.prefs({ errors: { label: "key" } }).validate(process.env)

// Throw an error if validation fails
if (validationError) {
    throw new Error(`Config validation error: ${validationError.message}`)
}

export const config = Object.freeze({
    port: validatedEnvVars.PORT,

    appEnvironment: validatedEnvVars.NODE_ENV as INodeEnv,

    auth: {
        accessTokenSecret: validatedEnvVars.ACCESS_TOKEN_SECRET,
        accessTokenExpiresIn: validatedEnvVars.ACCESS_TOKEN_EXP,
        refreshTokenSecret: validatedEnvVars.REFRESH_TOKEN_SECRET,
        refreshTokenExpiresIn: validatedEnvVars.REFRESH_TOKEN_EXP,
        encryptorSecretKey: validatedEnvVars.ENCRYPTOR_SECRET_KEY,
    },

    db: {
        dbUser: validatedEnvVars.DATABASE_USER,
        dbPassword: validatedEnvVars.DATABASE_PASSWORD,
        dbHost: validatedEnvVars.DATABASE_HOST,
        dbName: validatedEnvVars.DATABASE_NAME,
        dbType: validatedEnvVars.DATABASE_TYPE as Dialect,
    },

    cloudinary: {
        cloudName: validatedEnvVars.CLOUDINARY_NAME,
        apiKey: validatedEnvVars.CLOUDINARY_API_KEY,
        apiSecret: validatedEnvVars.CLOUDINARY_API_SECRET,
        assetsFolder: "NITPROFILE_ASSETS",
    },

    sendGrid: {
        sendGridApikey: validatedEnvVars.SENDGRID_API_KEY,
        sendgrid_email: validatedEnvVars.SENDGRID_EMAIL,
    },

    urls: {
        liveOrigin: validatedEnvVars.LIVE_ORIGIN,
        devOrigin: validatedEnvVars.DEV_ORIGIN,
        stagingOrigin: validatedEnvVars.STAGING_ORIGIN,
    },

    cache: {
        port: parseInt(process.env.REDIS_PORT!),
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD,
        ttl: parseInt(process.env.REDIS_TTL!),
    },
})
