"use client";
import { usePersistentStore } from "@/stores/usePersistentStore";
import { IResumeData } from "@/types/common.interfaces";
import { Trash2 } from "lucide-react";
import ConfirmDialog from "./ui/custom/confirm-dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

type Props = {
  resumeData: IResumeData;
};
export default function ResumeCard({ resumeData }: Props) {
  const { removeParsedResume } = usePersistentStore();

  const handleDelete = () => {
    removeParsedResume(resumeData.id);
  };
  return (
    <div className="w-full border shadow p-4 rounded-sm flex items-center">
      <p className="text-muted-foreground dark:text-foreground leading-tight mr-4 ">
        {resumeData.name}
      </p>
      <Badge variant={"outline"}>
        parsed on : {resumeData.date.toString()}
      </Badge>

      <div className="flex gap-4 items-center [&>svg]:size-4 w-fit ml-auto">
        <ConfirmDialog
          title="Delete Resume Data?"
          description={`Are you sure you want to delete the Resume Data?`}
          confirmText="Delete"
          onConfirm={handleDelete}
        >
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </ConfirmDialog>
      </div>
    </div>
  );
}
