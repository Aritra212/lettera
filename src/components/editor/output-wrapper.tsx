import { Button } from "@/components/ui/button";
import { Download, PenLine } from "lucide-react";

export default function OutputWrapper() {
  return (
    <div className="w-full">
      <div className="border-b px-7 h-12 flex gap-4 justify-end items-center">
        <Button size={"icon-sm"} variant={"outline"}>
          <PenLine />
        </Button>
        <Button size={"icon-sm"} variant={"outline"}>
          <Download />
        </Button>
      </div>
    </div>
  );
}
