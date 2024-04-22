import type { ContextTypes, ITokenSignedPayload } from "@/core"

export interface UserPayload {
    firstName: string
    otherName?: string
    lastName: string
    email: string
    password: string
    phoneNumber?:string
    isVerified?: boolean
    roleIds:string[]
}

export interface SignInPayload extends ContextTypes {
    input: Pick<UserPayload, "email" | "password">
}

export interface SignUpPayload extends ContextTypes {
    input: UserPayload
}

export interface SignOutPayload extends ContextTypes {
    user: ITokenSignedPayload
}

export interface AssignPermissionsPayload extends ContextTypes {
    input: {
        permissionIds: string[]
    }
    query: {
        userId?: string
        roleId?: string
    }
}

export interface NamePayload extends ContextTypes {
    input: {
        name:string
    }
}
