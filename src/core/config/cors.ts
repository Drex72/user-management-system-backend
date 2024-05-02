import type { CorsOptions } from "cors"
import { currentOrigin } from "../utils/getCurrentOrigin"

export const allowedOrigins: string | RegExp | (string | RegExp)[] = ["https://attendance-delta-black.vercel.app"]

const allowedMethods: string[] = ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]

const allowedHeaders: string[] = ["Content-Type", "Authorization"]

export const corsOptions: CorsOptions = {
    methods: allowedMethods,
    allowedHeaders,
    origin: "*",
    // credentials: true,
}
