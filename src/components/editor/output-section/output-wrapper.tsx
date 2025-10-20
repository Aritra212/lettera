"use client";

import RichTextEditor from "@/components/common/rich-teaxt-editor";
import { Button } from "@/components/ui/button";
import ButtonTooltip from "@/components/ui/custom/button-tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, Info, PenLine, Sparkles } from "lucide-react";
import { useState } from "react";
import { FaRegFilePdf } from "react-icons/fa6";

export default function OutputWrapper() {
  const [editText, setEditText] = useState(false);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center border-b px-7 h-12 ">
        <div className="flex gap-1 items-center">
          <Sparkles className="text-primary size-5 mr-2" />
          <p>Generated Output by - Gemini 2.5pro</p>
          <Button variant={"ghost"} size={"icon-sm"}>
            <Info className="text-muted-foreground" />
          </Button>
        </div>
        <div className="flex gap-4 items-center">
          <ButtonTooltip text="Edit Text">
            <Button
              variant={editText ? "default" : "outline"}
              size={"icon-sm"}
              onClick={() => setEditText((prev) => !prev)}
              className="rounded"
            >
              <PenLine />
            </Button>
          </ButtonTooltip>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size={"icon-sm"} variant={"outline"}>
                <Download />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-40 rounded-sm ">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <FaRegFilePdf /> Export as .PDF
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FaRegFilePdf /> Export as .DOC
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FaRegFilePdf /> Copy Text
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className=" space-y-3">
        <RichTextEditor
          content="<p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
          voluptas aliquid adipisci provident ducimus atque minima optio laborum
          nostrum facere ipsum ea, quidem consequatur, vitae laboriosam tempora
          vero repellat doloribus inventore obcaecati, architecto dolore
          corporis aspernatur? Eos ut eum modi repellat, necessitatibus qui
          dignissimos quo est, quisquam, repellendus doloribus nisi eius quae?
          Corporis, facere officiis unde molestiae doloribus iure perspiciatis
          aliquid maxime? Aspernatur corrupti exercitationem unde ratione
          suscipit laborum inventore corporis dignissimos impedit architecto
          odit sed sint voluptatem labore dolores, aperiam, consequatur dolor
          eligendi debitis perferendis harum, natus repellendus ab modi.
          Deleniti dolor asperiores repellat aperiam iure, obcaecati similique
          praesentium!
        </p>"
          readOnly={!editText}
        />
      </div>
    </div>
  );
}
