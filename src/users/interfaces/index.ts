import type { ContextTypes, RequestFileContents } from "@/core"

type DepartmentPayload = {
    name: string
}

// Departments
export interface CreateDepartmentPayload extends ContextTypes {
    input: DepartmentPayload
}

export interface UserDepartmentPayload extends ContextTypes {
    input: {
        userId: string
    }
    query: {
        departmentId: string
    }
}

export interface GetDepartmentUsersPayload extends ContextTypes {
    query: {
        departmentId: string
    }
}

export interface UpdateDepartmentPayload extends ContextTypes {
    input: Partial<DepartmentPayload>

    query: {
        departmentId: string
    }
}

// Users
export type BaseUserPayload = {
    firstName: string
    lastName: string
    email: string
    phoneNumber?: string
    roleIds?: string[]
}

export interface MultiUserPayload {
    users: Omit<BaseUserPayload, "roleIds">[]
    roleIds: string[]
}

export interface CreateNewUserPayload extends ContextTypes {
    input: BaseUserPayload
}

export interface CreateBulkUsersPayload extends ContextTypes {
    query: {
        roleId: string
    }

    files: {
        csv: RequestFileContents
    }
}

export interface UpdateUserPayload extends ContextTypes {
    input: Partial<Omit<BaseUserPayload, "roleIds">>

    query: {
        userId: string
    }
}

export interface ViewUsersPayload extends ContextTypes {
    query: {
        roleId?: string
    }
}
