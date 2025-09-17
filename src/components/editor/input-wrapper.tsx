import { TabsList, TabsTrigger } from "@/components/ui/custom/tabs-upperline";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { FileText, Settings, Sparkles } from "lucide-react";
import ModelSettings from "./model-settings";
import ManageResumes from "./manage-resumes";
import JobDetails from "./job-details";

export default function InputWrapper() {
  return (
    <div className="w-full h-full">
      <Tabs defaultValue="model-settings" className="gap-0">
        <TabsList className="h-12">
          <TabsTrigger value="model-settings">
            <Settings /> Model Settings
          </TabsTrigger>
          <TabsTrigger value="resumes">
            <FileText /> Resumes
          </TabsTrigger>
          <TabsTrigger value="job-details">
            <Sparkles /> Job Details
          </TabsTrigger>
        </TabsList>

        <TabsContent value="model-settings">
          <ModelSettings />
        </TabsContent>
        <TabsContent value="resumes">
          <ManageResumes />
        </TabsContent>
        <TabsContent value="job-details">
          <JobDetails />
        </TabsContent>
      </Tabs>
    </div>
  );
}
