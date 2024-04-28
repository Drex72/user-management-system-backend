import type { ValidationSchema } from "@/core"
import * as Joi from "joi"

export const signInSchema: ValidationSchema = {
    inputSchema: Joi.object({
        password: Joi.string().trim().required(),
        email: Joi.string().email().required().trim(),
    }),
}

export const signUpSchema: ValidationSchema = {
    inputSchema: Joi.object({
        password: Joi.string().trim().required(),
        firstName: Joi.string().trim().required(),
        lastName: Joi.string().trim().required(),
        otherName: Joi.string().trim().optional(),
        phoneNumber:Joi.string().trim().optional(),
        email: Joi.string().email().required().trim(),
        roleIds: Joi.array().items(Joi.string().length(36)).min(1).required(),
    }),
}

export const nameSchema: ValidationSchema = {
    inputSchema: Joi.object({
        name: Joi.string().trim().required(),
    }),
}

export const assignPermissionSchema: ValidationSchema = {
    inputSchema: Joi.object({
        permissionIds: Joi.array().items(Joi.string().length(36).trim()).min(1).required(),
    }),

    querySchema: Joi.object({
        userId: Joi.string().length(36).trim().optional(),
        roleId: Joi.string().length(36).trim().optional(),
    }),
}
