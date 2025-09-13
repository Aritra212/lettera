import { AI_MODELS } from "@/lib/constants";
import { cache } from "react";

function getCachedModelProviders() {
  return AI_MODELS.map(({ label, value }) => ({ label, value }));
}
export const getModelProviders = cache(getCachedModelProviders);

const AI_MODELS_MAP = new Map(
  AI_MODELS.map(({ value, models }) => [value, models])
);

function getCachedModels(provider: string) {
  return AI_MODELS_MAP.get(provider) ?? [];
}
export const getModelsByProvider = cache(getCachedModels);
