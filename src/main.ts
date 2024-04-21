"use strict"
import "module-alias/register"

import { startApp } from "@/app"
import { gracefullyShutdown, initializeDbConnection, logger } from "@/core"

// Initialize the database connection, start the application if successful, or shut down gracefully if an error occurs
initializeDbConnection().then(startApp).catch(gracefullyShutdown)

// Process-wide error handling for uncaught exceptions
process.on("uncaughtException", (error: unknown) => {
    logger.info("Uncaught exception", error) // Log the uncaught exception details
    process.exit(1) // Exit the process with a status code of 1 indicating failure
})

// Process-wide error handling for unhandled promise rejections
process.on("unhandledRejection", (error: unknown) => {
    logger.info("Unhandled rejection", error) // Log the unhandled promise rejection details
    process.exit(1) // Exit the process with a status code of 1 indicating failure
})
