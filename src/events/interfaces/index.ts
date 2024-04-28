import type { ContextTypes, RequestFileContents } from "@/core"

type EventPayload = {
    name: string
    description: string
    limit?: number
    date: Date
    time: string
    creatorId?: string
    creatorType?: EventCreatorType
}

export type EventCreatorType = "user" | "organization"

export interface CreateEventPayload extends ContextTypes {
    input: EventPayload

    files: {
        coverPhoto: RequestFileContents
    }
}

export interface UpdateEventPayload extends ContextTypes {
    input: Partial<EventPayload>

    files: {
        coverPhoto?: RequestFileContents
    }

    query: {
        eventId: string
    }
}

export interface RSVPEventPayload extends ContextTypes {
    input: {
        firstName: string
        lastName: string
        email: string
        phoneNumber?: string
    }

    query: {
        eventId: string
    }
}

export type ParsedTokenPayload = {
    eventId: string
    userId: string
}

export interface AttendEventPayload extends ContextTypes {
    input: {
        token: string
    }
}
