import { ControlBuilder } from "@/core/middlewares/controlBuilder"
import { Router } from "express"
import { createDepartment } from "../services"
import { viewUsers } from "../services/view-users"
import { editUser } from "../services/update-user"
import { createDepartmentSchema, singleBulkSchema } from "./schema"
import { bulkCreate } from "../services/single-bulk-user-create"

export const usersRouter = Router()

// Get Users
usersRouter.route("/").get(
    ControlBuilder.builder()
        .setHandler(viewUsers.handle)
        .handle()
)
// Update user
usersRouter.route("/update/:userId").get(
    ControlBuilder.builder()
        .setHandler(editUser.handle)
        .handle()
)
// Create User (Intern, staff, etc)
// Department table
usersRouter.route("/department").post(
    ControlBuilder.builder()
        .setHandler(createDepartment.handle)
        .setValidator(createDepartmentSchema)
        .handle()
)
// Bulk create users
usersRouter.route("/bulkCreate").post(
    ControlBuilder.builder()
        .setHandler(bulkCreate.handle)
        .setValidator(singleBulkSchema)
        .handle()
)


