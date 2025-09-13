import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IJobDetailsForm } from "@/components/forms/schemas/job-details-schema";
import { IModelInfo, IResumeData } from "@/types/common.interfaces";

interface AppState {
  // Resumes
  parsedResumes: IResumeData[];
  addParsedResume: (resume: IResumeData) => void;
  removeParsedResume: (id: string) => void;

  // AI Model Keys
  aiModelKeys: IModelInfo[];
  addAIModelKey: (key: IModelInfo) => void;
  updateAIModelKey: (provider: string, newKey: string) => void;
  removeAIModelKey: (provider: string) => void;

  // Job Form
  jobDetailsForm: Partial<IJobDetailsForm>;
  setJobDetailsForm: (data: Partial<IJobDetailsForm>) => void;
  resetJobDetailsForm: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Resumes
      parsedResumes: [],
      addParsedResume: (resume) =>
        set((state) => ({
          parsedResumes: [...state.parsedResumes, resume],
        })),
      removeParsedResume: (id) =>
        set((state) => ({
          parsedResumes: state.parsedResumes.filter((r) => r.id !== id),
        })),

      // AI Model Keys
      aiModelKeys: [],
      addAIModelKey: (key) =>
        set((state) => ({
          aiModelKeys: [...state.aiModelKeys, key],
        })),
      updateAIModelKey: (provider, newKey) =>
        set((state) => ({
          aiModelKeys: state.aiModelKeys.map((k) =>
            k.provider === provider ? { ...k, key: newKey } : k
          ),
        })),
      removeAIModelKey: (provider) =>
        set((state) => ({
          aiModelKeys: state.aiModelKeys.filter((k) => k.provider !== provider),
        })),

      // Job Form
      jobDetailsForm: {},
      setJobDetailsForm: (data) =>
        set((state) => ({
          jobDetailsForm: { ...state.jobDetailsForm, ...data },
        })),
      resetJobDetailsForm: () => set({ jobDetailsForm: {} }),
    }),
    {
      name: "app-store",
    }
  )
);
