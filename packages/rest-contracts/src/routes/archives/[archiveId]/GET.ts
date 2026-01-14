import { archiveSchema } from "#models/archive.js";
import z from "zod";

export const response = {
    200: z.object({
        status: z.string().describe("API status message"),
        message: z.string().describe("API message"),
        data: z.object(archiveSchema)
    })
}