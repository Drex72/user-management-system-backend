import { permissionAbility } from "@/core/common"
import type { user_roles } from "@/users/model"
import "express"
import type { IncomingHttpHeaders } from "http"
import type { Schema } from "joi"

/**
 * Represents options for handling controller actions with specific authorization settings.
 * @typedef {Object} ControllerHandlerOptions
 * @property {boolean} isPrivate - Indicates if the handler should be accessible only by authenticated users.
 * @property {boolean} [isPrivateAndPublic] - Optional. Indicates if the handler should be accessible by both authenticated and unauthenticated users.
 * @property {AllowedRole[]} [allowedRoles] - Optional. Specifies the roles allowed to access the handler.
 */
export type ControllerHandlerOptions = {
    isPrivate: boolean

    isPrivateAndPublic?: boolean

    // Only users that have roles specified in the allowedRoles property can access the handler. But Note Permissions Take priority over roles
    allowedRoles?: IAuthRole[]

    // Permissions take priority over roles
    allowedPermission?: string
}

/**
 * Represents a permission type such as read, write, etc
 * This type refers to a predefined list of Permission Types.
 * @typedef {PermissionAbilityType} PermissionAbilityType
 */
export type PermissionAbilityType = keyof typeof permissionAbility

/**
 * Represents a role that has been defined in the authentication model.
 * This type refers to a predefined list of roles.
 * These are default Roles that are prepopulated in the DB,
 * if you add a new Entity Type, add it here also to avoid typographical errors
 * @typedef {IAuthRole} IAuthRole
 */
export type IAuthRole = (typeof user_roles)[number]

/**
 * Represents the payload of a signed JWT token for authenticated users.
 * @typedef {Object} ITokenSignedPayload
 * @property {string} id - Unique identifier of the user.
 * @property {string} email - Email address of the user.
 * @property {IAuthRole} role - Role assigned to the user.
 */
export type ITokenSignedPayload = {
    id: string
    email: string
    roles: IAuthRole[]
}

/**
 * Generic object for key-value pairs, used for parameters.
 * @typedef {Object.<string, any>} IParams
 */
type IParams = {
    [key: string]: any
}

/**
 * Generic object for key-value pairs, used for query parameters.
 * @typedef {Object.<string, any>} IQuery
 */
type IQuery = {
    [key: string]: any
}

/**
 * Generic object for key-value pairs, used for input data in requests.
 * @typedef {Object.<string, any>} IInput
 */
type IInput = {
    [key: string]: any
}

/**
 * Represents the context of a request, containing various types of data passed in the request.
 * @typedef {Object} ContextTypes
 * @property {IParams} params - Route parameters.
 * @property {IQuery} query - Query parameters.
 * @property {IInput} input - Input data from the request body.
 * @property {ITokenSignedPayload|null|undefined} [user] - Authenticated user's payload, if available.
 * @property {FileObjects} files - Files uploaded in the request.
 * @property {IncomingHttpHeaders} headers - HTTP headers from the request.
 */
export interface ContextTypes {
    params: IParams
    query: IQuery
    input: IInput
    user?: ITokenSignedPayload | undefined | null
    files: FileObjects
    headers: IncomingHttpHeaders
}

/**
 * Describes the content of a file uploaded through a request.
 * @typedef {Object} RequestFileContents
 * @property {string} name - Original name of the file.
 * @property {Buffer} data - Raw data of the file.
 * @property {number} size - Size of the file in bytes.
 * @property {string} encoding - Encoding type of the file.
 * @property {string} tempFilePath - Temporary path to the file.
 * @property {boolean} truncated - Indicates if the file was truncated.
 * @property {string} mimetype - MIME type of the file.
 * @property {string} md5 - MD5 hash of the file's content.
 * @property {Function} mv - Method to move the file to a new location.
 */
export interface RequestFileContents {
    name: string
    data: Buffer
    size: number
    encoding: string
    tempFilePath: string
    truncated: boolean
    mimetype: string
    md5: string
    mv(path: string, callback: (err: any) => void): void
    mv(path: string): Promise<void>
}

/**
 * Represents a collection of files or arrays of files indexed by field names.
 * @typedef {Object.<string, (RequestFileContents|RequestFileContents[])>} FileObjects
 */
export type FileObjects = {
    [key: string]: RequestFileContents | RequestFileContents[]
}

type ExtractPayloadKeys<T> = {
    [K in keyof T]: K extends keyof ContextTypes ? K : never
}[keyof T]

type ExtractContextPayloadKeys<T> = Pick<T, ExtractPayloadKeys<T>>

export type Context<T> = T & ExtractContextPayloadKeys<T>

/**
 * Defines the schema for validating various parts of a request.
 * @typedef {Object} ValidationSchema
 * @property {Schema} [inputSchema] - JOI schema for input validation.
 * @property {Schema} [paramsSchema] - JOI schema for URL parameters validation.
 * @property {Schema} [querySchema] - JOI schema for query parameters validation.
 * @property {Schema} [fileSchema] - JOI schema for file validation.
 */
export interface ValidationSchema {
    inputSchema?: Schema
    paramsSchema?: Schema
    querySchema?: Schema
    fileSchema?: Schema
}
