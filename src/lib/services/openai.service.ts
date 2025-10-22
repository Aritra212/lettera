import OpenAI from "openai";

interface GenerateContentParams {
  apiKey: string;
  model: string;
  prompt: string;
}

export class OpenAIService {
  static async generateContent({
    apiKey,
    model,
    prompt,
  }: GenerateContentParams): Promise<string> {
    try {
      const openai = new OpenAI({
        apiKey,
        dangerouslyAllowBrowser: true, // Note: In production, API calls should be made from the backend
      });

      const response = await openai.chat.completions.create({
        model,
        messages: [
          {
            role: "system",
            content:
              "You are a professional cover letter and email writer. Generate well-structured, professional content based on the provided information. Format your response in HTML with proper paragraphs, headings where appropriate, and professional formatting.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1500,
      });

      const content = response.choices[0]?.message?.content;

      if (!content) {
        throw new Error("No content generated from OpenAI");
      }

      return content;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`OpenAI Error: ${error.message}`);
      }
      throw new Error("An unexpected error occurred with OpenAI");
    }
  }
}
