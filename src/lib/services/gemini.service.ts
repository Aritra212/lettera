import { GoogleGenerativeAI } from "@google/generative-ai";

interface GenerateContentParams {
  apiKey: string;
  model: string;
  prompt: string;
}

export class GeminiService {
  static async generateContent({
    apiKey,
    model,
    prompt,
  }: GenerateContentParams): Promise<string> {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const geminiModel = genAI.getGenerativeModel({ model });

      const systemInstruction =
        "You are a professional cover letter and email writer. Generate well-structured, professional content based on the provided information. Format your response in HTML with proper paragraphs, headings where appropriate, and professional formatting.";

      const result = await geminiModel.generateContent(
        `${systemInstruction}\n\n${prompt}`
      );

      const response = result.response;
      const content = response.text();

      if (!content) {
        throw new Error("No content generated from Gemini");
      }

      return content;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Gemini Error: ${error.message}`);
      }
      throw new Error("An unexpected error occurred with Gemini");
    }
  }
}
