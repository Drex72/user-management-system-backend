import { ControlBuilder } from "@/core/middlewares/controlBuilder"
import { Router } from "express"

import { assignUserToDepartment, createDepartment, getDepartmentUsers, updateDepartment, viewDepartments } from "../services/departments"
import { createBulkUsers, createSingleUser, updateUser, viewUsers } from "../services/users"
import { assignUserToDepartmentSchema, createBulkUsersSchema, createDepartmentSchema, createUserSchema, getDepartmentUsersSchema, viewUsersSchema,updateUserSchema, updateDepartmentSchema } from './schema'

export const usersRouter = Router()


usersRouter
    .route("/")
    .post(
        ControlBuilder.builder()
            .setHandler(createSingleUser.handle)
            .setValidator(createUserSchema)
            .handle()
    )
    .get(
        ControlBuilder.builder()
            .setHandler(viewUsers.handle)
            .setValidator(viewUsersSchema)
            .handle()
    )
    .patch(
        ControlBuilder.builder()
            .setHandler(updateUser.handle)
            .setValidator(updateUserSchema)
            .handle()
    )

usersRouter
    .post(
        "/bulk",
        ControlBuilder.builder()
            .setHandler(createBulkUsers.handle)
            .setValidator(createBulkUsersSchema)
            .handle()
    )


usersRouter
    .route("/department")
    .post(
        ControlBuilder.builder()
            .setHandler(createDepartment.handle)
            .setValidator(createDepartmentSchema)
            .handle()
    )
    .get(
        ControlBuilder.builder()
            .setHandler(viewDepartments.handle)
            .handle()
    )
    .patch(
        ControlBuilder.builder()
            .setHandler(updateDepartment.handle)
            .setValidator(updateDepartmentSchema)
            .handle()
    )

usersRouter
    .get(
        "/department/users",
        ControlBuilder.builder()
            .setHandler(getDepartmentUsers.handle)
            .setValidator(getDepartmentUsersSchema)
            .handle()
    )
    .post(
        "/department/users/assign",
        ControlBuilder.builder()
            .setHandler(assignUserToDepartment.handle)
            .setValidator(assignUserToDepartmentSchema)
            .handle()
    )
