import { ControlBuilder } from "@/core/middlewares/controlBuilder"
import { Router } from "express"
import { createTraining, createTrainingStudent, createTrainingStudents, updateTraining, viewTrainingStudents, viewTrainings } from "../services"
import { createBulkTrainingStudentsSchema, createTrainingSchema, createTrainingStudentsSchema, getTrainingStudentsSchema, updateTrainingSchema } from "./schema"

export const trainingsRouter = Router()


trainingsRouter
    .route("/")
    .post(
        ControlBuilder.builder()
            .setHandler(createTraining.handle)
            .setValidator(createTrainingSchema)
            .handle()
    )
    .get(
        ControlBuilder.builder()
            .setHandler(viewTrainings.handle)
            .handle()
    )
    .patch(
        ControlBuilder.builder()
            .setHandler(updateTraining.handle)
            .setValidator(updateTrainingSchema)
            .handle()
    )

trainingsRouter
    .route("/students")
    .post(
        ControlBuilder.builder()
            .setHandler(createTrainingStudent.handle)
            .setValidator(createTrainingStudentsSchema)
            .handle()
    )
    .get(
        ControlBuilder.builder()
        .setHandler(viewTrainingStudents.handle)
        .setValidator(getTrainingStudentsSchema)
        .handle()
    )

trainingsRouter
    .post(
        "/students/bulk",
        ControlBuilder.builder()
            .setHandler(createTrainingStudents.handle)
            .setValidator(createBulkTrainingStudentsSchema)
            .handle()
    )


