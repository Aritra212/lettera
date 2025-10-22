"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IJobDetailsForm,
  jobdetailsSchema,
} from "./schemas/job-details-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { DatePicker } from "../ui/custom/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  getModelProviders,
  getModelsByProvider,
} from "@/utils/data-access/models";
import { IOption } from "@/types/common.interfaces";
import { Button } from "../ui/button";
import { usePersistentStore } from "@/stores/usePersistentStore";
import { getProviderByName } from "@/lib/getProvider";
import { useTransientStore } from "@/stores/useTransientStore";
import { AIGeneratorService } from "@/lib/services/ai-generator.service";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function JobDetailsForm() {
  const [service, setService] = useState<"mail" | "cover-letter">("mail");
  const [models, setModels] = useState<IOption[]>([]);
  const { parsedResumes, aiModelKeys } = usePersistentStore();
  const {
    setGeneratedContent,
    setIsGenerating,
    setGenerationError,
    isGenerating,
  } = useTransientStore();

  const activeProviders = aiModelKeys.filter((d) => d.isActive);
  const form = useForm<IJobDetailsForm>({
    resolver: zodResolver(jobdetailsSchema),
    defaultValues: {
      date: new Date(),
      recipient: "Hiring Manager",
      provider: activeProviders[0]?.provider ?? "",
      model: models[0]?.value ?? "",
      jobType: "full-time",
      tone: "formal",
      resume: parsedResumes[0]?.id ?? "",
      company: "",
      jobDescription: "",
      name: "",
      role: "",
    },
  });

  const onSubmit = async (values: IJobDetailsForm) => {
    try {
      setIsGenerating(true);
      setGenerationError(null);

      // Find the selected resume
      const selectedResume = parsedResumes.find((r) => r.id === values.resume);
      if (!selectedResume) {
        throw new Error("Selected resume not found");
      }

      // Find the API key for the selected provider
      const selectedProvider = aiModelKeys.find(
        (k) => k.provider === values.provider && k.isActive
      );
      if (!selectedProvider) {
        throw new Error("No active API key found for the selected provider");
      }

      // Generate content using AI
      const content = await AIGeneratorService.generateContent({
        formData: values,
        resumeData: selectedResume,
        apiKey: selectedProvider.apiKey,
        serviceType: service,
      });

      // Update the store with the generated content
      setGeneratedContent(content, {
        model: values.model,
        provider: values.provider,
        generatedAt: new Date(),
        serviceType: service,
      });

      toast.success("Content generated successfully!");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to generate content";
      setGenerationError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  const selectedProvider = form.watch("provider");

  useEffect(() => {
    if (selectedProvider.length)
      setModels(getModelsByProvider(selectedProvider));
  }, [selectedProvider]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 m-4">
        <div className="space-y-4">
          <Label>Selecte a service</Label>
          <RadioGroup
            value={service}
            onValueChange={(v) => setService(v as "mail" | "cover-letter")}
            className="flex gap-4"
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value="mail" id="r2" />
              <Label htmlFor="r2">Write Email</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="cover-letter" id="r1" />
              <Label htmlFor="r1">Generate Cover letter</Label>
            </div>
          </RadioGroup>
        </div>

        <FormField
          control={form.control}
          name="jobDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Description *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Paste the job desction here..."
                  className="h-64"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 items-start">
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name of the company" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Role *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter job role/title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 items-start">
          <FormField
            control={form.control}
            name="jobType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Type</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-Time</SelectItem>
                      <SelectItem value="part-time">Part-Time</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="recipient"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipient Name *</FormLabel>
                <FormControl>
                  <Input placeholder="eg: Hiring Manager" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Full Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date *</FormLabel>
                <FormControl>
                  <DatePicker {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 items-start">
          <FormField
            control={form.control}
            name="resume"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Resume *</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a resume" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {parsedResumes.length > 0 ? (
                      parsedResumes.map((p) => (
                        <SelectItem value={p.id} key={p.id}>
                          {p.name}
                        </SelectItem>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground text-center my-10">
                        No resumes found
                      </p>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tone of Message</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="provider"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Model Provider</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a provider" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {activeProviders.length > 0 ? (
                      activeProviders.map((p) => (
                        <SelectItem value={p.provider} key={p.provider}>
                          {getProviderByName(p.provider)?.label}
                        </SelectItem>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground text-center my-10">
                        No api key found
                      </p>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Model</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={models.length < 1}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {models.map((p) => (
                      <SelectItem value={p.value} key={p.value}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        <div className="text-right">
          <Button size={"lg"} type="submit" disabled={isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
