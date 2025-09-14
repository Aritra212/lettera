"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useForm } from "react-hook-form";
import { addApiKeySchema, IAddApiForm } from "./schemas/add-api-key-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getModelProviders } from "@/utils/data-access/models";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { usePersistentStore } from "@/stores/usePersistentStore";
import { toast } from "sonner";

type Props = {
  children: React.ReactNode;
};

export default function AddApiDialogForm({ children }: Props) {
  const [open, setOpen] = useState(false);

  const form = useForm<IAddApiForm>({
    resolver: zodResolver(addApiKeySchema),
    defaultValues: {
      isActive: true,
      date: new Date(),
    },
  });

  const modelProviders = getModelProviders();
  const { addAIModelKey } = usePersistentStore();

  const onSubmit = (values: IAddApiForm) => {
    const { provider, apiKey } = values;

    // Add the new API key to the store
    addAIModelKey({
      provider,
      apiKey,
      isActive: values.isActive,
      date: values.date,
    });
    form.reset();
    setOpen(false);
    toast.success("Data stored successfully to your local storage");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>{children}</DialogTrigger>
        </TooltipTrigger>
        <TooltipContent align="start" side="bottom">
          Add New API Key
        </TooltipContent>
      </Tooltip>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a New API</DialogTitle>
          <DialogDescription className="sr-only">
            Add a new apy key
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-4"
          >
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
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Key</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your API Key" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-right">
              <Button size={"lg"} type="submit">
                <Plus /> Add
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
