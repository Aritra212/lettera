import ResumeCard from "@/components/resume-card";
import { Button } from "@/components/ui/button";
import ButtonTooltip from "@/components/ui/custom/button-tooltip";
import { FileText, Plus } from "lucide-react";

export default function ManageResumes() {
  return (
    <div>
      <div className="flex gap-4 justify-end pt-1 px-2">
        <ButtonTooltip text="View Documentation">
          <Button variant={"outline"} size={"icon-sm"}>
            <FileText />
          </Button>
        </ButtonTooltip>
        <ButtonTooltip text="Add new API">
          <Button variant={"outline"} size={"icon-sm"}>
            <Plus />
          </Button>
        </ButtonTooltip>
      </div>
      <div className="space-y-4 px-7 py-4">
        <ResumeCard />
        <ResumeCard />
        <ResumeCard />
        <ResumeCard />
      </div>
    </div>
  );
}
