import {
  Bold,
  Eraser,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  Quote,
  UnderlineIcon,
} from "lucide-react";
import { Toggle } from "../ui/toggle";
import { Editor } from "@tiptap/react";
import ButtonTooltip from "../ui/custom/button-tooltip";

// Color options constant
const colorOptions = [
  { name: "Red", value: "red" },
  { name: "Green", value: "green" },
  { name: "Blue", value: "blue" },
];

export default function EditorMenu({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  const menuOptions = [
    {
      icon: Bold,
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive("bold"),
    },
    {
      icon: Italic,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive("italic"),
    },
    {
      icon: UnderlineIcon,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      pressed: editor.isActive("underline"),
    },
    {
      icon: Heading2,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      pressed: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: Heading3,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      pressed: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: List,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editor.isActive("bulletList"),
    },
    {
      icon: ListOrdered,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editor.isActive("orderedList"),
    },
    {
      icon: Quote,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      pressed: editor.isActive("blockquote"),
    },
  ];

  return (
    <div className="flex gap-2 flex-wrap justify-end items-center px-4 py-2 border-b z-20 sticky top-0 backdrop-blur-2xl rounded-t-xl">
      {menuOptions.map((option, index) => (
        <Toggle
          key={index}
          pressed={option.pressed}
          onClick={option.onClick}
          variant={"outline"}
          size={"sm"}
          className="border-0 border-r rounded-none"
        >
          <option.icon className="size-4" />
        </Toggle>
      ))}

      {/* Color buttons */}
      {colorOptions.map((color) => (
        <Toggle
          key={color.value}
          pressed={editor.isActive("textStyle", { color: color.value })}
          onClick={() => editor.chain().focus().setColor(color.value).run()}
          variant="outline"
          className="size-5 min-w-5 rounded-full hover:border-foreground"
          style={{ backgroundColor: color.value }}
        />
      ))}

      {/* Clear Color Button */}
      <ButtonTooltip text="Erase Colors">
        <Toggle
          pressed={!editor.isActive("textStyle")}
          onClick={() => editor.chain().focus().unsetColor().run()}
          variant={"outline"}
          size={"sm"}
          className=" data-[state=on]:bg-transparent data-[state=on]:border-border data-[state=on]:text-foreground rounded-full cursor-pointer"
        >
          <Eraser />
        </Toggle>
      </ButtonTooltip>
    </div>
  );
}
