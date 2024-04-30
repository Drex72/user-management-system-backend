import cookieParser from "cookie-parser"
import cors from "cors"
import express from "express"
import fileUpload from "express-fileupload"

import { appRouter } from "@/app"
import { corsOptions, errorHandler, notFoundHandler } from "@/core"

export const app = express()

// Use the built-in middleware to parse JSON bodies. This allows you to handle JSON payloads.
app.use(express.json());

// Use cookie-parser middleware to parse cookies attached to the client request object.
app.use(cookieParser());

// Use file-upload middleware to handle file uploads.
// Files are stored in temporary files instead of memory for efficient large file handling.
app.use(
    fileUpload({
        useTempFiles: true,
    }),
);

// Enable Cross-Origin Resource Sharing (CORS) with predefined options.
app.use(cors());

// Serve static files located in the 'public' directory.
// This directory will now be publicly accessible via HTTP.
app.use(express.static("public"));

// Use middleware to parse URL-encoded bodies with the querystring library.
// 'extended: false' opts to use the classic encoding.
app.use(express.urlencoded({ extended: false }));

// Mount the API routes under '/api/v1'. All routes inside appRouter will be prefixed with '/api/v1'.
app.use("/api/v1", appRouter);

app.set('trust proxy', true)

// Use a custom middleware for handling 404 errors when no other route matches.
app.use(notFoundHandler.handle);

// Use a custom error handling middleware to manage responses on API errors.
// This captures any errors thrown in the application and formats them before sending to the user.
app.use(errorHandler.handle);
