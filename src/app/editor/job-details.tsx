import JobDetailsForm from "@/components/forms/job-details-form";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function JobDetails() {
  return (
    <ScrollArea className="px-7 py-4 h-[82vh]">
      <JobDetailsForm />
    </ScrollArea>
  );
}
