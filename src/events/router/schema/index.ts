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
        limit: Joi.number().optional(),
        date: Joi.date().iso().required(),
        time: Joi.string().trim().required(),
    }),
}

export const rsvpEventSchema: ValidationSchema = {
    inputSchema: Joi.object({
        firstName: Joi.string().trim().required(),
        lastName: Joi.string().trim().required(),
        phoneNumber: Joi.string().trim().optional(),
        email: Joi.string().email().required().trim(),
    }),

    querySchema: Joi.object({
        eventId: Joi.string().length(36).required(),
    }),
}
