import type { ValidationSchema } from "@/core"
import * as Joi from "joi"

export const schema: ValidationSchema = {
    inputSchema: Joi.object({
        password: Joi.string().trim().required(),
        email: Joi.string().email().required().trim(),
    }),
}

export const createDepartmentSchema: ValidationSchema = {
    inputSchema: Joi.object({
        name: Joi.string().trim().required()
    })
}

export const assignUserToDepartmentSchema: ValidationSchema = {
    inputSchema: Joi.object({
        userId: Joi.string().trim().required()
    }),
    querySchema: Joi.object({
        departmentId: Joi.string().length(36).required()
    })
}

export const singleBulkSchema: ValidationSchema = {
    inputSchema: Joi.alternatives().try(
        // for single user creation
        Joi.object({
            password: Joi.string().trim().required(),
            email: Joi.string().email().required().trim(),
            firstName: Joi.string().trim().required(),
            lastName: Joi.string().trim().required(),
            phoneNumber: Joi.string().trim(),
            roleIds: Joi.array().items(Joi.string().trim().required())
        }),
        // for bulk user creation
        Joi.object({
            users: Joi.array().items(Joi.object({
                password: Joi.string().trim().required(),
                email: Joi.string().email().required().trim(),
                firstName: Joi.string().trim().required(),
                lastName: Joi.string().trim().required(),
                phoneNumber: Joi.string().trim().required(),
                roleIds: Joi.array().items(Joi.string().trim().required())
            })).min(1).required()
        })
    )
}