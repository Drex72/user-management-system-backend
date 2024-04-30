import type { ValidationSchema } from "@/core"
import * as Joi from "joi"

// Departments
export const createDepartmentSchema: ValidationSchema = {
    inputSchema: Joi.object({
        name: Joi.string().trim().required(),
    }),
}

export const updateDepartmentSchema: ValidationSchema = {
    inputSchema: Joi.object({
        name: Joi.string().trim().required(),
    }),

    querySchema: Joi.object({
        departmentId: Joi.string().length(36).required(),
    }),
}

export const assignUserToDepartmentSchema: ValidationSchema = {
    inputSchema: Joi.object({
        userId: Joi.string().trim().required(),
    }),
    querySchema: Joi.object({
        departmentId: Joi.string().length(36).required(),
    }),
}

export const getDepartmentUsersSchema: ValidationSchema = {
    querySchema: Joi.object({
        departmentId: Joi.string().length(36).required(),
    }),
}

// Users
export const createUserSchema: ValidationSchema = {
    inputSchema: Joi.object({
        email: Joi.string().required().trim(),
        firstName: Joi.string().trim().required(),
        lastName: Joi.string().trim().required(),
        phoneNumber: Joi.string().trim().optional(),
        roleIds: Joi.array().items(Joi.string().trim().required()).min(1),
    }),
}

export const updateUserSchema: ValidationSchema = {
    inputSchema: Joi.object({
        email: Joi.string().email().trim(),
        firstName: Joi.string().trim(),
        lastName: Joi.string().trim(),
        phoneNumber: Joi.string().trim(),
    }).min(1), // At least one field is required for updating

    querySchema: Joi.object({
        userId: Joi.string().length(36).required(),
    }),
}

export const createBulkUsersSchema: ValidationSchema = {
    querySchema: Joi.object({
        roleId: Joi.string().length(36).required(),
    }),
}

export const viewUsersSchema: ValidationSchema = {
    querySchema: Joi.object({
        roleId: Joi.string().length(36).optional(),
    }),
}
