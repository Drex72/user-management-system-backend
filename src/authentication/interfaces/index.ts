import type { ContextTypes, IAuthRole, ITokenSignedPayload } from "@/core"

export interface UserPayload {
    firstName: string
    otherName?: string
    lastName: string
    email: string
    password: string
    role: IAuthRole
    isVerified?: boolean
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
