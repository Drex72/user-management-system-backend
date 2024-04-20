import type { ValidationSchema } from "@/core"
import * as Joi from "joi"

export const signInSchema: ValidationSchema = {
    inputSchema: Joi.object({
        password: Joi.string().trim().required(),
        email: Joi.string().email().required().trim(),
    }),
}
