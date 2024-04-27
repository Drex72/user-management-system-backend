import { ContextTypes, RequestFileContents } from "@/core"
import { BaseUserPayload } from "@/users/interfaces"

interface IBaseTraining {
    name: string
    startDate: Date
    endDate: Date
}

export interface CreateTrainingPayload extends ContextTypes {
    input: IBaseTraining
}

export interface UpdateTrainingPayload extends ContextTypes {
    input: Partial<IBaseTraining>

    query: {
        trainingId: string
    }
}

export interface CreateTrainingStudentPayload extends ContextTypes {
    input: BaseUserPayload

    query: {
        trainingId: string
    }
}

export interface CreateTrainingStudentsPayload extends ContextTypes {
    query: {
        trainingId: string
    }

    files: {
        csv: RequestFileContents
    }
}

export interface ViewTrainingStudentsPayload extends ContextTypes {
    query: {
        trainingId: string
    }
}
