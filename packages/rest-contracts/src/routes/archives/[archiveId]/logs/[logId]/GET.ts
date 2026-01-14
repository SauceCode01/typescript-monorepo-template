import { archiveSchema } from "#models/archive.js";
import z from "zod";

export const response = {
    200: z.object({
        status: z.string().describe("API status message"),
        message: z.string().describe("API message"),
        data: z.object({
            logId: z.string().uuid().describe("ID of the log"),
            archiveId: z.string().uuid().describe("ID of the archive"),
            content: z.string().describe("Content of the log"),
            createdAt: z.string().describe("Creation timestamp of the log"),
        })
    })
}