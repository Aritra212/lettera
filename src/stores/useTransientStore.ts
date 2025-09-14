import { create } from "zustand";
import { IJobDetailsForm } from "@/components/forms/schemas/job-details-schema";

interface TransientState {
  jobDetailsForm: Partial<IJobDetailsForm>;
  setJobDetailsForm: (data: Partial<IJobDetailsForm>) => void;
  resetJobDetailsForm: () => void;

  generatedContent: string | null;
  setGeneratedContent: (content: string) => void;
  clearGeneratedContent: () => void;
}

export const useTransientStore = create<TransientState>((set) => ({
  jobDetailsForm: {},
  generatedContent: null,

  setJobDetailsForm: (data) =>
    set((state) => ({
      jobDetailsForm: { ...state.jobDetailsForm, ...data },
    })),
  resetJobDetailsForm: () => set({ jobDetailsForm: {} }),

  setGeneratedContent: (content) => set({ generatedContent: content }),
  clearGeneratedContent: () => set({ generatedContent: null }),
}));
