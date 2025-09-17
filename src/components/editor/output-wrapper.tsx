import { Button } from "@/components/ui/button";
import { Download, PenLine } from "lucide-react";

export default function OutputWrapper() {
  return (
    <div className="w-full">
      <div className="border-b px-4 py-1 flex gap-4 justify-end">
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
