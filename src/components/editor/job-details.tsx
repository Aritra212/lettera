import JobDetailsForm from "@/components/forms/job-details-form";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function JobDetails() {
  return (
    <ScrollArea className="px-7 pt-1 h-[82vh]">
      <JobDetailsForm />
    </ScrollArea>
  );
}
