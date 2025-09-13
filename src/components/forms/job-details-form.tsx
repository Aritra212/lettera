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
import { useState } from "react";
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
import { getModelProviders } from "@/utils/data-access/models";
import { IOption } from "@/types/common.interfaces";
import { Button } from "../ui/button";

export default function JobDetailsForm() {
  const [service, setService] = useState<"mail" | "cover-letter">("mail");
  const [models, setModels] = useState<IOption[]>([]);

  const modelProviders = getModelProviders();
  const form = useForm<IJobDetailsForm>({
    resolver: zodResolver(jobdetailsSchema),
    defaultValues: {
      date: new Date(),
      recipient: "Hiring Manager",
      provider: modelProviders[0].value ?? "",
    },
  });

  const onSubmit = (values: IJobDetailsForm) => {
    console.log(values);
  };

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

        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name of the compnay" {...field} />
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

        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Resume *</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                    {modelProviders.map((p) => (
                      <SelectItem value={p.value} key={p.value}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="provider"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Model</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={models.length < 1}
                >
                  <FormControl>
                    <SelectTrigger disabled>
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
          <Button size={"lg"} type="submit">
            Generate
          </Button>
        </div>
      </form>
    </Form>
  );
}
