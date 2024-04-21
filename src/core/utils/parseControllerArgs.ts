import type { Request } from "express";
import type { FileArray } from "express-fileupload";
import { IncomingHttpHeaders } from "http";
import type { FileObjects, ITokenSignedPayload, RequestFileContents } from "../types";

export type ParsedRequestContext = {
    input: any;
    params: any;
    query: any;
    headers: IncomingHttpHeaders;
    user?: ITokenSignedPayload | null;
    files: FileObjects | null;
}

class ParseContextArgs {
    parse = (req: Request):ParsedRequestContext => {
        return {
            input: req.body,
            params: req.params,
            query: req.query,
            headers: req.headers,
            user: req.user,
            files: ParseContextArgs.parseFileContents(req.files),
        }
    }

    private static parseFileContents = (files: FileArray | null | undefined): FileObjects | null => {
        if (!files) return null

        const fileObjects: FileObjects = {}

        for (let key in files) {
            const file = files[key] as RequestFileContents | RequestFileContents[]

            fileObjects[key] = file
        }

        return fileObjects
    }
}

export default new ParseContextArgs()
