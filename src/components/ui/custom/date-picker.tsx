"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

type DatePickerProps = {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  triggerClassName?: string;
};

export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  triggerClassName,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-between bg-input border border-border font-normal h-12 rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring px-3 hover:bg-input/40 hover:backdrop-blur-md text-foreground hover:text-muted-foreground",
            !value && "text-muted-foreground",
            triggerClassName
          )}
        >
          {value instanceof Date && !isNaN(value.getTime()) ? (
            format(value, "PPP")
          ) : (
            <span>{placeholder}</span>
          )}
          <CalendarIcon className="opacity-50 ml-auto w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-auto" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
          disabled={{
            before: new Date(),
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
