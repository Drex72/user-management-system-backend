import type { ValidationSchema } from "@/core"
import * as Joi from "joi"

export const schema: ValidationSchema = {
    inputSchema: Joi.object({
        password: Joi.string().trim().required(),
        email: Joi.string().email().required().trim(),
    }),
}

export const createEventSchema: ValidationSchema = {
    inputSchema: Joi.object({
        name: Joi.string().trim().required(),
        description: Joi.string().trim().required(),
        limit: Joi.number().required(),
        date: Joi.date().required(),
        time: Joi.string().trim().required(),
    }),
}

export const rsvpEventSchema: ValidationSchema = {
    inputSchema: Joi.object({
        password: Joi.string().trim().required(),
        email: Joi.string().email().required().trim(),
    }),
}
