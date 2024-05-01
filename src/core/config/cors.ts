import type { CorsOptions } from "cors"
import { currentOrigin } from "../utils/getCurrentOrigin"

export const allowedOrigins: string | RegExp | (string | RegExp)[] = ["http://localhost:3000", "https://attendance-management-frontend-two.vercel.app"]

const allowedMethods: string[] = ["GET", "POST", "PUT", "DELETE", "PATCH"]

const allowedHeaders: string[] = ["Content-Type", "Authorization"]

export const corsOptions: CorsOptions = {
    methods: allowedMethods,
    allowedHeaders,
    origin: "http://localhost:3000",
    credentials: true,
}
