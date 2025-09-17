import InputWrapper from "@/components/editor/input-wrapper";
import OutputWrapper from "@/components/editor/output-wrapper";

export default function MainPage() {
  return (
    <div className="grid grid-cols-2 divide-x h-full">
      <InputWrapper />
      <OutputWrapper />
    </div>
  );
}
