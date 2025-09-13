"use client";

import { MdOutlineDocumentScanner } from "react-icons/md";
import { Switch } from "./ui/switch";
import {
  ChevronsUpDown,
  Copy,
  Eye,
  EyeOff,
  PenLine,
  Trash2,
} from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import Show from "./show";

export default function ModelCard() {
  const [open, setOpen] = useState(false);
  const [eyeOpen, setEyeOpen] = useState(false);
  const api = "werLLLLskfnkwejfjwoe30320kss";

  const getMaskedKey = (key: string) => {
    const last4 = key.slice(-4);
    return "•".repeat(key.length - 4) + last4;
  };

  return (
    <div className="w-full border shadow p-4 rounded-sm ">
      <div className="flex justify-between items-center">
        <div className="flex gap-1.5 items-center">
          <MdOutlineDocumentScanner className="size-4 text-primary" />
          <p className="text-muted-foreground">Use Lettera</p>
          <p className="border w-fit rounded-full text-[10px] ml-3 py-0.5 px-1.5 leading-normal">
            ✨ Recomended
          </p>
        </div>
        <div className="flex gap-4 items-center [&>svg]:size-4">
          <PenLine />
          <Trash2 />
          <Switch />
          <Button
            variant={"ghost"}
            size={"icon-sm"}
            onClick={() => setOpen((prev) => !prev)}
          >
            <ChevronsUpDown />
          </Button>
        </div>
      </div>
      <Show when={open}>
        <div className="py-4 px-5 text-xs space-y-1.5">
          <p>Your API key</p>
          <div className="flex gap-3 items-center">
            <p className="text-muted-foreground text-sm leading-normal min-w-48 bg-accent/40 py-0.5 px-2 rounded-full">
              {eyeOpen ? api : getMaskedKey(api)}
            </p>
            <Button
              variant={"ghost"}
              size={"icon-sm"}
              onClick={() => setEyeOpen((prev) => !prev)}
            >
              {eyeOpen ? <Eye /> : <EyeOff />}
            </Button>
            <Button variant={"ghost"} size={"icon-sm"}>
              <Copy />
            </Button>
          </div>
        </div>
      </Show>
    </div>
  );
}
