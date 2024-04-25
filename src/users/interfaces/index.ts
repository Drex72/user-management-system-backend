import type { ContextTypes } from "@/core";

type DepartmentPayload = {
    departmentName: string
}

type UserPayload = {
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber?: string
}

type SingleUserPayload = {
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber?: string
    roleIds: string[]
}

interface BulkUserPayload extends ContextTypes {
    users: SingleUserPayload[];
}

export interface SingleOrBulkUserPayload extends ContextTypes {
    input: SingleUserPayload | BulkUserPayload;
}

export interface CreateDepartmentPayload extends ContextTypes {
    input: DepartmentPayload
}

export interface UpdateUserPayload extends ContextTypes {
    input: Partial<UserPayload>
    query: {
        userId: string
    }
}

export interface UserDepartmentPayload extends ContextTypes {
    input: {
        userId: string
    }
    query: {
        departmentId: string
    }
}