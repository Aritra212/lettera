import { RiOpenaiFill, RiGeminiFill } from "react-icons/ri";

const providers = [
  {
    value: "open-ai",
    label: "Open AI",
    icon: RiOpenaiFill,
  },
  {
    value: "gemini",
    label: "Gemini",
    icon: RiGeminiFill,
  },
];

export function getProviderByName(name: string) {
  return providers.find((v) => v.value === name);
}
