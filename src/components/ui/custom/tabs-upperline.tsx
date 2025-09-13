import React from "react";
import {
  TabsTrigger as BaseTabsTrigger,
  TabsList as BaseTabsList,
} from "../tabs";
import { cn } from "@/lib/utils";

type TabsTriggerProps = {
  children: React.ReactNode;
  value: string;
};
export function TabsTrigger({ value, children }: TabsTriggerProps) {
  return (
    <BaseTabsTrigger
      value={value}
      className="flex-none rounded-none border-muted data-[state=active]:border-t-primary dark:data-[state=active]:border-t-primary data-[state=active]:border-t-2 data-[state=active]:border-b-background dark:data-[state=active]:border-b-transparent h-full cursor-pointer"
    >
      {children}
    </BaseTabsTrigger>
  );
}

type TabsListProps = {
  className?: string;
  children: React.ReactNode[];
};
export function TabsList({ className, children }: TabsListProps) {
  return (
    <BaseTabsList
      className={cn(
        "w-full justify-start rounded-none p-0 bg-transparent px-7 border-b",
        className
      )}
    >
      {...children}
    </BaseTabsList>
  );
}
