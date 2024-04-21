import { authGuard } from "@/authentication/helpers/authGuard"
import type { AllowedRole, AnyFunction, ControllerHandlerOptions, ExpressCallbackFunction, ITokenSignedPayload, ValidationSchema } from "@/core"
import {
    ForbiddenError,
    HttpStatus,
    ParsedRequestContext,
    UnAuthorizedError,
    UnProcessableError,
    joiValidate,
    logger,
    parseControllerArgs,
} from "@/core"
import { permissionAbility } from "@/core/common"
import type { NextFunction, Request, Response } from "express"
import { AppMessages } from "../common"

/**
 * @typedef AuthenticateRequestOptions
 * @property {Record<any, any>} cookies The cookies sent with the request.
 * @property {ITokenSignedPayload | null | undefined} user The user object from the request, if authenticated.
 * @property {(user: ITokenSignedPayload) => void} callbackFn The callback function to set the user object on the request.
 */
type AuthenticateRequestOptions = {
    cookies: Record<any, any>
    user: ITokenSignedPayload | null | undefined
    callbackFn: (user: ITokenSignedPayload) => void
}

/**
 * @typedef AuthorizeRequestOptions
 * @property {string} method The HTTP method of the current request.
 * @property {ITokenSignedPayload} user The authenticated user's payload.
 * @property {AllowedRole[]} allowedRoles The roles allowed to access the controller.
 */
type AuthorizeRequestOptions = {
    method: string
    user: ITokenSignedPayload
    allowedRoles: AllowedRole[]
}

/**
 * Handles HTTP requests by providing methods for authentication, authorization, validation, and controller execution.
 */
export class ControllerHandler {
    /**
     * Creates a middleware function to handle the request, perform authentication and authorization, validate the request data,
     * and execute the controller function.
     * @param {AnyFunction} controllerFn The controller function to execute.
     * @param {ValidationSchema} [schema={}] The schema to validate the request data against.
     * @param {ControllerHandlerOptions} options Configuration options for handling the request.
     * @returns {ExpressCallbackFunction} The Express middleware function.
     */
    handle = (controllerFn: AnyFunction, schema: ValidationSchema | undefined = {}, options: ControllerHandlerOptions): ExpressCallbackFunction => {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                // Authenticate the request if required.
                if (options.isPrivate || options.isPrivateAndPublic) {
                    await this.authenticateRequest({
                        user: req.user,
                        cookies: req.cookies,
                        callbackFn: (user) => {
                            req.user = user
                        },
                    })
                }

                // Authorize the request if roles are specified and user exists.
                if (options.allowedRoles && options.allowedRoles.length > 0 && req.user) {
                    this.authorizeRequest({
                        method: req.method,
                        user: req.user,
                        allowedRoles: options.allowedRoles,
                    })
                }

                // Parse the controller arguments from the request.
                const controllerArgs = parseControllerArgs.parse(req)

                // Validate the request data against the provided schema.
                if (schema) {
                    this.validateRequest(schema, controllerArgs)
                }

                // Execute the controller function and handle its response.
                const controllerResult = await controllerFn(controllerArgs)

                // If controller function returns nothing, send a standard OK response.
                if (!controllerResult) {
                    res.status(HttpStatus.OK).send({ status: true })

                    return
                }

                const { code, headers, ...data } = controllerResult

                res.set({ ...headers })
                    .status(code ?? HttpStatus.OK)
                    .send(data)
            } catch (error) {
                logger.error(`error ${error}`)

                next(error)
            }
        }
    }

    /**
     * Authenticate the request based on the cookies and optionally set the user object.
     * @param {AuthenticateRequestOptions} data The authentication data.
     * @private
     */
    private async authenticateRequest(data: AuthenticateRequestOptions) {
        const { callbackFn, cookies, user } = data

        // If user data exists and is valid, skip authentication.
        if (user && user.id && user?.role) return

        // Perform authentication using authGuard.
        const isRequestAllowed = await authGuard.guard(cookies)

        if (!isRequestAllowed) throw new UnAuthorizedError(AppMessages.FAILURE.INVALID_CREDENTIALS)

        // Set the user on the request using the callback.
        callbackFn(isRequestAllowed)
    }

    /**
     * Validate the request data against the provided schema.
     * @param {ValidationSchema} schema The schema definitions for query, params, and input.
     * @param {ParsedRequestContext} controllerArgs The parsed controller arguments.
     * @private
     */
    private validateRequest(schema: ValidationSchema, controllerArgs: ParsedRequestContext) {
        const { querySchema, paramsSchema, inputSchema } = schema

        const { input, params, query } = controllerArgs

        try {
            if (inputSchema) joiValidate(inputSchema, input)
            if (querySchema) joiValidate(querySchema, query)
            if (paramsSchema) joiValidate(paramsSchema, params)
        } catch (error: any) {
            throw new UnProcessableError(error.message.replaceAll('"', ""))
        }
    }

    /**
     * Authorize the request based on the user's role and the allowed roles for the request.
     * @param {AuthorizeRequestOptions} data The authorization data.
     * @private
     */
    private authorizeRequest(data: AuthorizeRequestOptions) {
        const { allowedRoles, method, user } = data

        let roleFound = false

        allowedRoles.map((role) => {
            if (typeof role === "string") {
                const isRequestAuthorized = role.toLocaleLowerCase() === user.role.toLocaleLowerCase()

                if (isRequestAuthorized) roleFound = true

                return
            }

            if (typeof role !== "string" && role?.role) {
                const isRequestAuthorized = role.role.toLocaleLowerCase() === user.role.toLocaleLowerCase()

                if (!isRequestAuthorized) return

                const isMethodAuthorized = role.permissions.find((permission) => permissionAbility[permission] === method)

                if (isMethodAuthorized) roleFound = true

                return
            }
        })

        if (!roleFound) throw new ForbiddenError("You do not have access to the requested resource")
    }
}
