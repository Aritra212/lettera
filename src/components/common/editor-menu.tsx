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
  Strikethrough,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Highlighter,
  Undo,
  Redo,
  Minus,
} from "lucide-react";
import { Toggle } from "../ui/toggle";
import { Editor } from "@tiptap/react";
import ButtonTooltip from "../ui/custom/button-tooltip";
import { Separator } from "../ui/separator";

// Color options constant
const colorOptions = [
  { name: "Red", value: "red" },
  { name: "Green", value: "green" },
  { name: "Blue", value: "blue" },
];

export default function EditorMenu({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  const textFormattingOptions = [
    {
      icon: Bold,
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive("bold"),
      tooltip: "Bold",
    },
    {
      icon: Italic,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive("italic"),
      tooltip: "Italic",
    },
    {
      icon: UnderlineIcon,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      pressed: editor.isActive("underline"),
      tooltip: "Underline",
    },
    {
      icon: Strikethrough,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      pressed: editor.isActive("strike"),
      tooltip: "Strikethrough",
    },
    {
      icon: Code,
      onClick: () => editor.chain().focus().toggleCode().run(),
      pressed: editor.isActive("code"),
      tooltip: "Code",
    },
    {
      icon: Highlighter,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      pressed: editor.isActive("highlight"),
      tooltip: "Highlight",
    },
  ];

  const headingOptions = [
    {
      icon: Heading2,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      pressed: editor.isActive("heading", { level: 2 }),
      tooltip: "Heading 2",
    },
    {
      icon: Heading3,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      pressed: editor.isActive("heading", { level: 3 }),
      tooltip: "Heading 3",
    },
  ];

  const listOptions = [
    {
      icon: List,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editor.isActive("bulletList"),
      tooltip: "Bullet List",
    },
    {
      icon: ListOrdered,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editor.isActive("orderedList"),
      tooltip: "Numbered List",
    },
    {
      icon: Quote,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      pressed: editor.isActive("blockquote"),
      tooltip: "Quote",
    },
  ];

  const alignmentOptions = [
    {
      icon: AlignLeft,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      pressed: editor.isActive({ textAlign: "left" }),
      tooltip: "Align Left",
    },
    {
      icon: AlignCenter,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      pressed: editor.isActive({ textAlign: "center" }),
      tooltip: "Align Center",
    },
    {
      icon: AlignRight,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      pressed: editor.isActive({ textAlign: "right" }),
      tooltip: "Align Right",
    },
    {
      icon: AlignJustify,
      onClick: () => editor.chain().focus().setTextAlign("justify").run(),
      pressed: editor.isActive({ textAlign: "justify" }),
      tooltip: "Justify",
    },
  ];

  const historyOptions = [
    {
      icon: Undo,
      onClick: () => editor.chain().focus().undo().run(),
      pressed: false,
      tooltip: "Undo",
      disabled: !editor.can().undo(),
    },
    {
      icon: Redo,
      onClick: () => editor.chain().focus().redo().run(),
      pressed: false,
      tooltip: "Redo",
      disabled: !editor.can().redo(),
    },
  ];

  return (
    <div className="flex gap-1 flex-wrap items-center px-4 py-2 border-b z-20 sticky top-0 backdrop-blur-2xl rounded-t-xl">
      {/* History Options */}
      {historyOptions.map((option, index) => (
        <ButtonTooltip key={`history-${index}`} text={option.tooltip}>
          <Toggle
            pressed={option.pressed}
            onClick={option.onClick}
            variant={"outline"}
            size={"sm"}
            disabled={option.disabled}
            className="border-0"
          >
            <option.icon className="size-4" />
          </Toggle>
        </ButtonTooltip>
      ))}

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Text Formatting */}
      {textFormattingOptions.map((option, index) => (
        <ButtonTooltip key={`text-${index}`} text={option.tooltip}>
          <Toggle
            pressed={option.pressed}
            onClick={option.onClick}
            variant={"outline"}
            size={"sm"}
            className="border-0"
          >
            <option.icon className="size-4" />
          </Toggle>
        </ButtonTooltip>
      ))}

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Headings */}
      {headingOptions.map((option, index) => (
        <ButtonTooltip key={`heading-${index}`} text={option.tooltip}>
          <Toggle
            pressed={option.pressed}
            onClick={option.onClick}
            variant={"outline"}
            size={"sm"}
            className="border-0"
          >
            <option.icon className="size-4" />
          </Toggle>
        </ButtonTooltip>
      ))}

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Lists and Quotes */}
      {listOptions.map((option, index) => (
        <ButtonTooltip key={`list-${index}`} text={option.tooltip}>
          <Toggle
            pressed={option.pressed}
            onClick={option.onClick}
            variant={"outline"}
            size={"sm"}
            className="border-0"
          >
            <option.icon className="size-4" />
          </Toggle>
        </ButtonTooltip>
      ))}

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Alignment */}
      {alignmentOptions.map((option, index) => (
        <ButtonTooltip key={`align-${index}`} text={option.tooltip}>
          <Toggle
            pressed={option.pressed}
            onClick={option.onClick}
            variant={"outline"}
            size={"sm"}
            className="border-0"
          >
            <option.icon className="size-4" />
          </Toggle>
        </ButtonTooltip>
      ))}

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Color buttons */}
      {colorOptions.map((color) => (
        <ButtonTooltip key={color.value} text={`Text Color: ${color.name}`}>
          <Toggle
            pressed={editor.isActive("textStyle", { color: color.value })}
            onClick={() => editor.chain().focus().setColor(color.value).run()}
            variant="outline"
            className="size-5 min-w-5 rounded-full hover:border-foreground border-0"
            style={{ backgroundColor: color.value }}
          />
        </ButtonTooltip>
      ))}

      {/* Clear Color Button */}
      <ButtonTooltip text="Clear Formatting">
        <Toggle
          pressed={false}
          onClick={() =>
            editor.chain().focus().unsetColor().unsetAllMarks().run()
          }
          variant={"outline"}
          size={"sm"}
          className="rounded-full cursor-pointer border-0"
        >
          <Eraser className="size-4" />
        </Toggle>
      </ButtonTooltip>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Horizontal Rule */}
      <ButtonTooltip text="Insert Divider">
        <Toggle
          pressed={false}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          variant={"outline"}
          size={"sm"}
          className="border-0"
        >
          <Minus className="size-4" />
        </Toggle>
      </ButtonTooltip>
    </div>
  );
}
