import type { AnyFunction, ControllerHandlerOptions, IAuthRole, ValidationSchema } from "../types"
import { ControllerHandler } from "./controllerHandler"

/**
 * Builder class for setting up and configuring a controller handler.
 * This class allows fluent style configuration by chaining method calls.
 */
export class ControlBuilder {
    private handler!: AnyFunction

    private schema: ValidationSchema | undefined

    private options: ControllerHandlerOptions = {
        isPrivate: false,
    }

    /**
     * Initializes and returns a new instance of ControlBuilder.
     * @returns {ControlBuilder} A new instance of ControlBuilder.
     * @static
     */
    static builder() {
        return new ControlBuilder()
    }

    /**
     * Sets the handler function that will be used to process requests.
     * @param {AnyFunction} func - The function to handle the request.
     * @returns {ControlBuilder} The instance of this builder for chaining.
     */
    setHandler(func: AnyFunction) {
        this.handler = func
        return this
    }

    /**
     * Sets the validation schema for validating request data.
     * @param {ValidationSchema} schema - The schema to validate the request data.
     * @returns {ControlBuilder} The instance of this builder for chaining.
     */
    setValidator(schema: ValidationSchema) {
        this.schema = schema
        return this
    }

    /**
     * Marks the route as requiring authentication.
     * @returns {ControlBuilder} The instance of this builder for chaining.
     */
    isPrivate() {
        this.options = { ...this.options, isPrivate: true }

        return this
    }

    /**
     * Marks the route as accessible both privately (authenticated) and publicly (unauthenticated).
     * @returns {ControlBuilder} The instance of this builder for chaining.
     */
    isPublicAndPrivate() {
        this.options = { ...this.options, isPrivateAndPublic: true }

        return this
    }

    /**
     * Marks the route as accessible only if the Ip address of the user is part of the whitelisted ip's
     * @returns {ControlBuilder} The instance of this builder for chaining.
     */
    isIpRestricted(whitelistedIp: string[]) {
        this.options = { ...this.options, whitelistedIp }

        return this
    }

    /**
     * Specifies Permissions allowed to access the route. Automatically marks the route as private.
     * @param {...string[]} allowed - An array of allowed permissions.
     * @returns {ControlBuilder} The instance of this builder for chaining.
     */
    withPermission(permission: string) {
        this.options = { isPrivate: true, allowedPermission: permission }

        return this
    }

    /**
     * Specifies roles allowed to access the route. Automatically marks the route as private.
     * @param {...IAuthRole[]} allowed - An array of allowed roles.
     * @returns {ControlBuilder} The instance of this builder for chaining.
     */
    only(...allowed: IAuthRole[]) {
        this.options = { isPrivate: true, allowedRoles: allowed }

        return this
    }

    /**
     * Builds and returns the controller handler with the configured settings.
     * @returns {ExpressCallbackFunction} The middleware function that handles the request.
     */
    handle() {
        return new ControllerHandler().handle(this.handler, this.schema, this.options)
    }
}
