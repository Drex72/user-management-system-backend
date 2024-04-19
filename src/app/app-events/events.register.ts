import { config, logger } from "@/core"

/**
 * Event Listener Registry.
 */
export const register = {
    "app:up": () => {
        logger.info(`Server started successfully on port ${config.port}`)
        config.appEnvironment !== "development" && console.log(`Server started successfully on port ${config.port}`)
    },
    "cache:connection:established": () => logger.info(`Cache connection established`),
    "event:registeration:succesful": () => logger.info("Events listeners registered"),
}
