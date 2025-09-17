"use client";
import AddApiDialogForm from "@/components/forms/add-api-key-form";
import ModelCard from "@/components/model-card";
import Show from "@/components/show";
import { Button } from "@/components/ui/button";
import ButtonTooltip from "@/components/ui/custom/button-tooltip";
import { usePersistentStore } from "@/stores/usePersistentStore";
import { FileText, Plus } from "lucide-react";

export default function ModelSettings() {
  const { aiModelKeys } = usePersistentStore();
  return (
    <div>
      <div className="flex gap-4 justify-end pt-3 px-7">
        <ButtonTooltip text="View Documentation">
          <Button variant={"outline"} size={"icon-sm"}>
            <FileText />
          </Button>
        </ButtonTooltip>
        <AddApiDialogForm>
          <Button variant={"outline"} size={"icon-sm"}>
            <Plus />
          </Button>
        </AddApiDialogForm>
      </div>
      <Show when={aiModelKeys.length < 1}>
        <p className="text-muted-foreground text-center my-56">
          Add your own api keys here.
        </p>
      </Show>
      <Show when={aiModelKeys.length > 0}>
        <div className="space-y-4 px-7 py-4">
          {aiModelKeys.map((a) => (
            <ModelCard key={a.apiKey} modelData={a} />
          ))}
        </div>
      </Show>
    </div>
  );
}
