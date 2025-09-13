import { FileText, RotateCcw, Trash2 } from "lucide-react";

export default function ResumeCard() {
  return (
    <div className="w-full border shadow p-4 rounded-sm grid grid-cols-6 items-center">
      <div className="flex gap-2 items-center col-span-3">
        <FileText className="size-4 text-primary shrink-0" />
        <p className="text-muted-foreground dark:text-foreground leading-tight ">
          Resume for Frontend Jobs sddd dddd ddddddd dddddd ddddddddddddsssssss
        </p>
      </div>
      <p className="text-[10px] border rounded-full p-0.5 px-3 leading-loose col-span-2 h-fit w-fit text-muted-foreground dark:text-secondary">
        parsed on : {new Date().toDateString()}
      </p>

      <div className="flex gap-4 items-center [&>svg]:size-4 w-fit ml-auto">
        <RotateCcw />
        <Trash2 />
      </div>
    </div>
  );
}
