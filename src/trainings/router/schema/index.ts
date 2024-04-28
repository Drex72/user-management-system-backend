import type { ValidationSchema } from "@/core"
import * as Joi from "joi"

export const createTrainingSchema: ValidationSchema = {
    inputSchema: Joi.object({
        name: Joi.string().trim().required(),
        startDate: Joi.date().iso().required(),
        endDate: Joi.date().required().iso().min(Joi.ref("startDate")),
    }),
}

export const updateTrainingSchema: ValidationSchema = {
    inputSchema: Joi.object({
        name: Joi.string().trim(),
        startDate: Joi.date().iso(),
        endDate: Joi.date().iso().min(Joi.ref("startDate")),
    }).min(1),
}

export const createTrainingStudentsSchema: ValidationSchema = {
    inputSchema: Joi.object({
        email: Joi.string().required().trim(),
        firstName: Joi.string().trim().required(),
        lastName: Joi.string().trim().required(),
        phoneNumber: Joi.string().trim().optional(),
    }),

    querySchema: Joi.object({
        trainingId: Joi.string().length(36).required(),
    }),
}


export const createBulkTrainingStudentsSchema: ValidationSchema = {
    querySchema: Joi.object({
        trainingId: Joi.string().length(36).required(),
    }),
}


export const getTrainingStudentsSchema: ValidationSchema = {
    querySchema: Joi.object({
        trainingId: Joi.string().length(36).required(),
    }),
}

