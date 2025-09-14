import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IModelInfo, IResumeData } from "@/types/common.interfaces";

interface AppState {
  // Resumes
  parsedResumes: IResumeData[];
  addParsedResume: (resume: IResumeData) => void;
  removeParsedResume: (id: string) => void;

  // AI Model Keys
  aiModelKeys: IModelInfo[];
  addAIModelKey: (key: IModelInfo) => void;
  updateAIModelField: <K extends keyof IModelInfo>(
    provider: string,
    field: K,
    value: IModelInfo[K]
  ) => void;
  removeAIModelKey: (provider: string) => void;
}

export const usePersistentStore = create<AppState>()(
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
      updateAIModelField: (provider, field, value) =>
        set((state) => ({
          aiModelKeys: state.aiModelKeys.map((model) =>
            model.provider === provider ? { ...model, [field]: value } : model
          ),
        })),
      removeAIModelKey: (provider) =>
        set((state) => ({
          aiModelKeys: state.aiModelKeys.filter((k) => k.provider !== provider),
        })),
    }),
    {
      name: "app-store",
    }
  )
);
