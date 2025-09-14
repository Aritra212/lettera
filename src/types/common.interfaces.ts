export interface IOption {
  label: string;
  value: string;
}

export interface IResumeData {
  parsedData: string;
  date: Date;
  id: string;
  name: string;
}

export interface IModelInfo {
  provider: Providers;
  apiKey: string;
  date: Date;
  isActive: boolean;
}

export type Providers = "open-ai" | "gemini";
