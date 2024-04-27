import { ControlBuilder } from "@/core/middlewares/controlBuilder"
import { Router } from "express"
import { createTraining, createTrainingStudent, createTrainingStudents, updateTraining, viewTrainingStudents, viewTrainings } from "../services"

export const trainingsRouter = Router()


trainingsRouter
    .route("/")
    .post(
        ControlBuilder.builder()
            .setHandler(createTraining.handle)
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
            .handle()
    )

trainingsRouter
    .route("/students")
    .post(
        ControlBuilder.builder()
            .setHandler(createTrainingStudent.handle)
            .handle()
    )
    .get(
        ControlBuilder.builder()
        .setHandler(viewTrainingStudents.handle)
        .handle()
    )

trainingsRouter
    .post(
        "/students/bulk",
        ControlBuilder.builder()
            .setHandler(createTrainingStudents.handle)
            .handle()
    )


