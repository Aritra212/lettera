import * as z from "zod";

export const jobdetailsSchema = z.object({
  jobDescription: z.string().min(30, "Job description is too short"),
  company: z.string({ error: "Company name is required" }),
  role: z.string({ error: "Job role is required" }),
  date: z.date({ error: "Invalid date" }),
  name: z.string({ error: "Name is required" }),
  resume: z.string({ error: "Resume required" }),
  model: z.string({ error: "Model required" }),
  provider: z.string({ error: "Model type is required" }),
  recipient: z.string({ error: "Recipient is required" }),
  tone: z.string().optional(),
  jobType: z.string().optional(),
});

export type IJobDetailsForm = z.infer<typeof jobdetailsSchema>;
