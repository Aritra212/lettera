"use client";
import AddResumeDialogForm from "@/components/forms/add-resume-dialog-form";
import ResumeCard from "@/components/resume-card";
import { Button } from "@/components/ui/button";
import ButtonTooltip from "@/components/ui/custom/button-tooltip";
import { usePersistentStore } from "@/stores/usePersistentStore";
import { FileText, Plus } from "lucide-react";

export default function ManageResumes() {
  const { parsedResumes } = usePersistentStore();
  return (
    <div>
      <div className="flex gap-4 justify-end pt-3 px-7">
        <ButtonTooltip text="View Documentation">
          <Button variant={"outline"} size={"icon-sm"}>
            <FileText />
          </Button>
        </ButtonTooltip>
        <AddResumeDialogForm>
          <Button variant={"outline"} size={"icon-sm"}>
            <Plus />
          </Button>
        </AddResumeDialogForm>
      </div>
      <div className="space-y-4 px-7 py-4">
        {parsedResumes.map((resume) => (
          <ResumeCard key={resume.id} resumeData={resume} />
        ))}
      </div>
    </div>
  );
}
