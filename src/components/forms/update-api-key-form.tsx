"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
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
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { usePersistentStore } from "@/stores/usePersistentStore";
import { toast } from "sonner";
import { IModelInfo } from "@/types/common.interfaces";

type Props = {
  children: React.ReactNode;
  data: IModelInfo;
};

export default function UpdateApiDialogForm({ children, data }: Props) {
  const [open, setOpen] = useState(false);

  const form = useForm<IAddApiForm>({
    resolver: zodResolver(addApiKeySchema),
    defaultValues: {
      isActive: data.isActive,
      provider: data.provider,
      apiKey: data.apiKey,
      date: new Date(),
    },
  });

  const { updateAIModelField } = usePersistentStore();

  const onSubmit = (values: IAddApiForm) => {
    const { provider, apiKey } = values;

    updateAIModelField(provider, "apiKey", apiKey);

    setOpen(false);
    toast.success("Data updated successfully to your local storage");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update API Key</DialogTitle>
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
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
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
                Update
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
