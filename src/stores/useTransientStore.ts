import { create } from "zustand";
import { IJobDetailsForm } from "@/components/forms/schemas/job-details-schema";

interface GenerationMetadata {
  model: string;
  provider: string;
  generatedAt: Date;
  serviceType: "mail" | "cover-letter";
}

interface TransientState {
  jobDetailsForm: Partial<IJobDetailsForm>;
  setJobDetailsForm: (data: Partial<IJobDetailsForm>) => void;
  resetJobDetailsForm: () => void;

  generatedContent: string | null;
  generationMetadata: GenerationMetadata | null;
  isGenerating: boolean;
  generationError: string | null;

  setGeneratedContent: (content: string, metadata: GenerationMetadata) => void;
  clearGeneratedContent: () => void;
  setIsGenerating: (isGenerating: boolean) => void;
  setGenerationError: (error: string | null) => void;
}

export const useTransientStore = create<TransientState>((set) => ({
  jobDetailsForm: {},
  generatedContent: null,
  generationMetadata: null,
  isGenerating: false,
  generationError: null,

  setJobDetailsForm: (data) =>
    set((state) => ({
      jobDetailsForm: { ...state.jobDetailsForm, ...data },
    })),
  resetJobDetailsForm: () => set({ jobDetailsForm: {} }),

  setGeneratedContent: (content, metadata) =>
    set({
      generatedContent: content,
      generationMetadata: metadata,
      generationError: null,
    }),
  clearGeneratedContent: () =>
    set({
      generatedContent: null,
      generationMetadata: null,
      generationError: null,
    }),
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  setGenerationError: (error) =>
    set({ generationError: error, isGenerating: false }),
}));
