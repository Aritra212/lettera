"use client";

import { useState } from "react";
import { Button } from "../button";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Props = {
  text: string;
  className?: string;
  size?: "sm" | "icon" | "icon-sm" | "default" | "lg";
  withToast?: boolean;
};

export default function CopyButton({
  text,
  className,
  size = "icon-sm",
  withToast = true,
}: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      if (withToast) {
        toast.success("Text copied to clipboard.");
      }

      setTimeout(() => setCopied(false), 2000); // reset after 2s
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <Button
      variant="ghost"
      size={size}
      onClick={handleCopy}
      className={cn("transition-all", className)}
    >
      {copied ? <Check /> : <Copy />}
    </Button>
  );
}
