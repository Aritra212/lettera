import InputWrapper from "./input-wrapper";
import OutputWrapper from "./output-wrapper";

export default function MainPage() {
  return (
    <div className="grid grid-cols-2 divide-x h-full">
      <InputWrapper />
      <OutputWrapper />
    </div>
  );
}
