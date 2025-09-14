"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addResumeSchema, IAddResumeForm } from "./schemas/add-resume-schema";
import { v4 as uuidv4 } from "uuid";
import { useDropzone } from "react-dropzone";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
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
import { usePersistentStore } from "@/stores/usePersistentStore";
import { parseResumeFile } from "@/utils/services/parseResumeFile";

type Props = {
  children: React.ReactNode;
};

export default function AddResumeDialogForm({ children }: Props) {
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { addParsedResume } = usePersistentStore();

  const form = useForm<IAddResumeForm>({
    resolver: zodResolver(addResumeSchema),
    defaultValues: {
      file: undefined,
      name: "",
    },
  });

  const { setValue, handleSubmit, reset } = form;

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setValue("file", file, { shouldValidate: true });
      setFileName(file.name);
    },
    [setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
  });

  const onSubmit = async (values: IAddResumeForm) => {
    if (!values.file) return;

    try {
      setLoading(true);

      const parsedText = await parseResumeFile(values.file);

      addParsedResume({
        id: uuidv4(),
        name: values.name,
        date: new Date(),
        parsedData: parsedText,
      });

      reset();
      setFileName(null);
      setOpen(false);
    } catch (err) {
      console.error("Parsing failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>{children}</DialogTrigger>
        </TooltipTrigger>
        <TooltipContent align="start" side="bottom">
          Add New Resume
        </TooltipContent>
      </Tooltip>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Resume</DialogTitle>
          <DialogDescription className="sr-only">
            Add a new resume
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div
                      {...getRootProps()}
                      className={`border-2 border-dashed rounded-md p-6 py-16 text-center cursor-pointer transition-all
                        ${
                          isDragActive
                            ? "border-primary bg-muted"
                            : "border-muted-foreground"
                        }
                      `}
                    >
                      <Input {...getInputProps()} />
                      <p className="text-sm text-muted-foreground">
                        {isDragActive
                          ? "Drop the file here..."
                          : "Drag & drop a PDF or DOCX file here, or click to browse."}
                      </p>
                      {fileName && (
                        <p className="mt-2 text-sm font-medium">{fileName}</p>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage className="text-center" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resume Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Resume for fullstack role"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="text-right mt-10">
              <Button type="submit" size={"lg"} disabled={loading}>
                {loading ? "Parsing..." : "Upload Resume"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
