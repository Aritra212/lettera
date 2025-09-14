import * as z from "zod";

export const addResumeSchema = z.object({
  file: z
    .instanceof(File, { message: "Please upload a valid file." })
    .refine(
      (file) =>
        [
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file.type),
      {
        message: "Only PDF or DOCX files are supported.",
      }
    )
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File size must be under 5MB.",
    }),

  name: z.string().min(1, "Enter a name"),
});

export type IAddResumeForm = z.infer<typeof addResumeSchema>;
