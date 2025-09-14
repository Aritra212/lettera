import * as z from "zod";

export const addApiKeySchema = z.object({
  provider: z.enum(["open-ai", "gemini"], { error: "Invalid provider type" }),
  apiKey: z.string({ error: "Api Key is required" }),
  date: z.date({ error: "Invalid date" }),
  isActive: z.boolean(),
});

export type IAddApiForm = z.infer<typeof addApiKeySchema>;
