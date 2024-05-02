import type { ValidationSchema } from "@/core"
import * as Joi from "joi"

export const schema: ValidationSchema = {
    inputSchema: Joi.object({
        password: Joi.string().trim().required(),
        email: Joi.string().email().required().trim(),
    }),
}

export const viewEventsSchema: ValidationSchema = {
    querySchema: Joi.object({
        eventId: Joi.string().trim().optional(),
    }),
}


export const createEventSchema: ValidationSchema = {
    inputSchema: Joi.object({
        name: Joi.string().trim().required(),
        description: Joi.string().trim().required(),
        limit: Joi.number().optional(),
        date: Joi.date()
            .iso()
            .required()
            .error((errors) => {
                errors.forEach((err) => {
                    switch (err.code) {
                        case "date.format":
                            err.message = "Invalid input format for Date. Please enter the date in the following format: YYYY-MM-DD."
                            break
                        default:
                            break
                    }
                })
                return errors
            }),

        time: Joi.string()
            .trim()
            .required()
            .regex(/^([1-9]|0[1-9]|1[0-2]):[0-5][0-9] ([AaPp][Mm])$/)
            .error((errors) => {
                errors.forEach((err) => {
                    switch (err.code) {
                        case "string.pattern.base":
                            err.message = "Invalid input format for time. Please enter the time in the following format: HH:MM AM/PM. "
                            break
                        default:
                            break
                    }
                })
                return errors
            }),
        creatorId: Joi.string().length(36).trim().optional(),
        creatorType: Joi.string().valid("user", "organization").trim().optional(),
    }),
}

export const updateEventSchema: ValidationSchema = {
    inputSchema: Joi.object({
        name: Joi.string().trim(),
        description: Joi.string().trim(),
        limit: Joi.number(),
        date: Joi.date()
            .iso()
            .error((errors) => {
                errors.forEach((err) => {
                    switch (err.code) {
                        case "date.format":
                            err.message = "Invalid input format for Date. Please enter the date in the following format: YYYY-MM-DD."
                            break
                        default:
                            break
                    }
                })
                return errors
            }),

        time: Joi.string()
            .trim()
            .regex(/^([1-9]|0[1-9]|1[0-2]):[0-5][0-9] ([AaPp][Mm])$/)
            .error((errors) => {
                errors.forEach((err) => {
                    switch (err.code) {
                        case "string.pattern.base":
                            err.message = "Invalid input format for time. Please enter the time in the following format: HH:MM AM/PM. "
                            break
                        default:
                            break
                    }
                })
                return errors
            }),
        creatorId: Joi.string().length(36).trim(),
        creatorType: Joi.string().valid("user", "organization").trim(),
    }).min(1),
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

export const attendEventSchema: ValidationSchema = {
    inputSchema: Joi.object({
        token: Joi.string().required().required(),
    }),
}

export const eventQuerySchema: ValidationSchema = {
    querySchema: Joi.object({
        eventId: Joi.string().length(36).required(),
    }),
}



