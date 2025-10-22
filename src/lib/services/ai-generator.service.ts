import { IJobDetailsForm } from "@/components/forms/schemas/job-details-schema";
import { IResumeData } from "@/types/common.interfaces";
import { OpenAIService } from "./openai.service";
import { GeminiService } from "./gemini.service";
import { format } from "date-fns";

interface GenerateContentParams {
  formData: IJobDetailsForm;
  resumeData: IResumeData;
  apiKey: string;
  serviceType: "mail" | "cover-letter";
}

export class AIGeneratorService {
  /**
   * Build the prompt for AI generation based on service type
   */
  private static buildPrompt(
    params: GenerateContentParams
  ): string {
    const { formData, resumeData, serviceType } = params;
    const formattedDate = format(formData.date, "MMMM dd, yyyy");

    const baseContext = `
Generate a professional ${serviceType === "mail" ? "email" : "cover letter"} with the following details:

Job Details:
- Company: ${formData.company}
- Role: ${formData.role}
- Job Type: ${formData.jobType || "Not specified"}
- Job Description: ${formData.jobDescription}

Personal Information:
- Applicant Name: ${formData.name}
- Recipient: ${formData.recipient}
- Date: ${formattedDate}

Tone: ${formData.tone || "formal"}

Resume/Background:
${resumeData.parsedData}

Requirements:
1. ${serviceType === "mail" ? "Write a professional email expressing interest in the position" : "Create a comprehensive cover letter"}
2. Highlight relevant experience from the resume that matches the job description
3. Use a ${formData.tone || "formal"} tone throughout
4. Include proper greeting and closing
5. Make it personalized and compelling
6. Format the output in clean HTML with proper paragraphs using <p> tags
7. Use <h2> for any section headings if needed
8. Keep it concise but impactful (around 300-400 words)
9. Address it to ${formData.recipient}
10. Sign off with ${formData.name}
    `.trim();

    return baseContext;
  }

  /**
   * Generate content using the specified AI provider
   */
  static async generateContent(
    params: GenerateContentParams
  ): Promise<string> {
    const { formData, apiKey } = params;
    const prompt = this.buildPrompt(params);

    try {
      let content: string;

      if (formData.provider === "open-ai") {
        content = await OpenAIService.generateContent({
          apiKey,
          model: formData.model,
          prompt,
        });
      } else if (formData.provider === "gemini") {
        content = await GeminiService.generateContent({
          apiKey,
          model: formData.model,
          prompt,
        });
      } else {
        throw new Error(`Unsupported provider: ${formData.provider}`);
      }

      // Clean up the content if it has markdown code blocks
      if (content.includes("```html")) {
        content = content
          .replace(/```html\n?/g, "")
          .replace(/```\n?/g, "")
          .trim();
      }

      return content;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to generate content. Please try again.");
    }
  }
}
