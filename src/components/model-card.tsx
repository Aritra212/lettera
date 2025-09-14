"use client";

import { useState } from "react";
import { MdOutlineDocumentScanner } from "react-icons/md";
import {
  ChevronsUpDown,
  Copy,
  Dot,
  Eye,
  EyeOff,
  PenLine,
  Trash2,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import Show from "./show";
import { IModelInfo } from "@/types/common.interfaces";
import { getProviderByName } from "@/lib/getProvider";
import { Badge } from "./ui/badge";
import CopyButton from "./ui/custom/copy-button";
import { usePersistentStore } from "@/stores/usePersistentStore";
import UpdateApiDialogForm from "./forms/update-api-key-form";
import ConfirmDialog from "./ui/custom/confirm-dialog";

type Props = {
  modelData: IModelInfo;
};

export default function ModelCard({ modelData }: Props) {
  const [open, setOpen] = useState(false);
  const [eyeOpen, setEyeOpen] = useState(false);
  const { removeAIModelKey, updateAIModelField } = usePersistentStore();

  const providerInfo = getProviderByName(modelData.provider);
  const ProviderIcon = providerInfo?.icon || MdOutlineDocumentScanner;

  const handleDelete = () => {
    removeAIModelKey(modelData.provider);
  };

  const handleToggleActive = (checked: boolean) => {
    updateAIModelField(modelData.provider, "isActive", checked);
  };

  return (
    <div className="w-full border shadow p-4 rounded-sm">
      <div className="flex justify-between items-center">
        <div className="flex gap-1.5 items-center">
          <ProviderIcon className="size-7 text-primary" />
          <p className="text-muted-foreground dark:text-foreground mr-4">
            {providerInfo?.label} Key
          </p>
          <Show when={modelData.isActive}>
            <Badge variant={"outline"}>Active</Badge>
          </Show>
        </div>

        <div className="flex gap-2 items-center [&>svg]:size-4">
          <UpdateApiDialogForm data={modelData}>
            <Button variant="ghost" size="icon">
              <PenLine />
            </Button>
          </UpdateApiDialogForm>
          <ConfirmDialog
            title="Delete API Key?"
            description={`Are you sure you want to delete the key for ${providerInfo?.label}?`}
            confirmText="Delete"
            onConfirm={handleDelete}
          >
            <Button variant="ghost" size="icon">
              <Trash2 />
            </Button>
          </ConfirmDialog>
          <Switch
            checked={modelData.isActive}
            onCheckedChange={handleToggleActive}
          />
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => setOpen((prev) => !prev)}
          >
            <ChevronsUpDown />
          </Button>
        </div>
      </div>

      <Show when={open}>
        <div className="py-4 px-5 text-xs space-y-2">
          <p className="text-base ml-2">Your API Key</p>

          <div className="flex items-center gap-2 max-w-md">
            <Input
              type={eyeOpen ? "text" : "password"}
              value={modelData.apiKey}
              readOnly
              className="text-sm"
            />

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setEyeOpen((prev) => !prev)}
              type="button"
            >
              {eyeOpen ? <EyeOff /> : <Eye />}
            </Button>

            <CopyButton text={modelData.apiKey} size="icon" />
          </div>
        </div>
      </Show>
    </div>
  );
}
