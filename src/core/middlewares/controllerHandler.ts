import { cache } from "@/app/app-cache"
import { authGuard } from "@/auth/helpers/authGuard"
import type { AnyFunction, ControllerHandlerOptions, ExpressCallbackFunction, IAuthRole, ITokenSignedPayload, ValidationSchema } from "@/core"
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
import { User } from "@/users/model"
import type { NextFunction, Request, Response } from "express"
import { IncomingHttpHeaders } from "http"

/**
 * @typedef AuthenticateRequestOptions
 * @property {Record<any, any>} cookies The cookies sent with the request.
 * @property {ITokenSignedPayload | null | undefined} user The user object from the request, if authenticated.
 * @property {(user: ITokenSignedPayload) => void} callbackFn The callback function to set the user object on the request.
 */
type AuthenticateRequestOptions = {
    cookies: Record<any, any>
    headers: IncomingHttpHeaders

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
    user: ITokenSignedPayload
    permission: string
    allowedRoles: IAuthRole[]
}

type PermissionBasedAuthorizationOptions = {
    userId: string
    permission: string
}

type RoleBasedAuthorizationOptions = {
    userRoles: IAuthRole[]
    allowedRoles: IAuthRole[]
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
                // Check if Ip is allowed
                if (options.whitelistedIp?.length) {
                    if (!req.ip || options.whitelistedIp.includes(req.ip)) {
                        throw new ForbiddenError("Ip is not allowed")
                    }
                }

                // Authenticate the request if required.
                if (options.isPrivate || options.isPrivateAndPublic) {
                    await this.authenticateRequest({
                        user: req.user,
                        cookies: req.cookies,
                        headers: req.headers,
                        callbackFn: (user) => {
                            req.user = user
                        },
                    })
                }

                // Authorize the request if roles are specified and user exists.
                if ((options.allowedPermission || options.allowedRoles?.length) && req.user) {
                    await this.authorizeRequest({
                        user: req.user,
                        allowedRoles: options.allowedRoles ?? [],
                        permission: options.allowedPermission ?? "",
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

                res.set({ ...headers, "Access-Control-Allow-Origin": "http://localhost:3000" })
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
        const { callbackFn, headers, user } = data
        console.log(headers["authorization"])


        
        // If user data exists and is valid, skip authentication.
        if (user && user.id) return

        // Perform authentication using authGuard.
        const isRequestAllowed = await authGuard.guard(headers)

        if (!isRequestAllowed) throw new UnAuthorizedError("Unauthorized")

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
    private async authorizeRequest(data: AuthorizeRequestOptions) {
        const { user, allowedRoles, permission } = data

        // Check for permission-based authorization
        const hasPermission = await this.permissionBasedAuthorization({
            permission,
            userId: user.id,
        })

        // If the user has the necessary permission, early return
        if (hasPermission) return

        const cachedRoles = await cache.get(user.id)

        let userRoles: IAuthRole[] = []

        if (cachedRoles) {
            userRoles = JSON.parse(cachedRoles)
        } else {
            const existingUser = await User.findOne({ where: { id: user.id } })

            if (existingUser) {
                userRoles = existingUser.roles?.map((role) => role.name) as IAuthRole[]

                await cache.set(user.id, JSON.stringify(userRoles), "EX", 3600)
            }
        }

        // Check for role-based authorization only if permission-based authorization fails
        const hasRole = await this.roleBasedAuthorization({
            allowedRoles: allowedRoles,
            userRoles,
        })

        // If the user does not have the role, throw an error
        if (!hasRole) {
            throw new ForbiddenError("Access denied: You do not have the required role or permission.")
        }
    }

    private async permissionBasedAuthorization(options: PermissionBasedAuthorizationOptions): Promise<boolean> {
        const { permission, userId } = options

        // Retrieve user's permissions from the cache using the user ID.
        const userPermissions = await cache.get(`${userId}-permissions`)

        // Check if the user permissions array includes the required permission.
        // If the userPermissions is null or undefined, it will return false.
        return userPermissions ? userPermissions.includes(permission) : false
    }

    private async roleBasedAuthorization(options: RoleBasedAuthorizationOptions): Promise<boolean> {
        const { allowedRoles, userRoles } = options

        // Check if any user role matches any of the allowed roles
        return userRoles.some((userRole) => allowedRoles.some((allowedRole) => allowedRole.toLocaleLowerCase() === userRole.toLocaleLowerCase()))
    }
}
