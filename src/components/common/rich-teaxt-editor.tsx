"use client";

import { cn } from "@/lib/utils";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { useEffect } from "react";
import EditorMenu from "./editor-menu";

type Props = {
  editorClassName?: string;
  onValueChange?: (value: string) => void;
  content?: string;
  readOnly?: boolean;
  clear?: number;
};

export default function RichTextEditor({
  editorClassName,
  onValueChange,
  content,
  clear = 0,
  readOnly = false,
}: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        blockquote: {
          HTMLAttributes: {
            class: "border-l-4 border-muted pl-4 italic text-muted-foreground",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-3",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-3",
          },
        },
      }),
      Underline,
      Heading.configure({ levels: [2, 3] }),
      TextStyle,
      Color.configure({ types: ["textStyle"] }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none focus:outline-none [&_p]:mb-1 min-h-24",
        style: readOnly ? "pointer-events: none; opacity: 0.7" : "",
      },
    },
    onUpdate: ({ editor }) => {
      onValueChange?.(editor.getHTML());
    },
    immediatelyRender: false,
  });
  useEffect(() => {
    if (editor && clear > 0) editor.commands.clearContent();
  }, [editor, clear]);

  if (!editor) return null;

  return (
    <div className=" disabled:opacity-50 shadow-sm  focus-visible:ring-1 focus-visible:ring-ring text-sm placeholder:text-muted-foreground transition-colors focus-visible:outline-none disabled:cursor-not-allowed w-full overflow-y-auto max-h-96 no-scrollbar relative">
      {!readOnly && <EditorMenu editor={editor} />}
      <EditorContent
        editor={editor}
        className={cn(
          "border-0 max-w-none prose px-6 [&_div]:outline-0 mt-4",
          !readOnly && " overflow-y-auto no-scrollbar",
          editorClassName
        )}
      />
    </div>
  );
}
