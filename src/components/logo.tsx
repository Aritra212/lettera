import { MdOutlineDocumentScanner } from "react-icons/md";

export default function Logo() {
  return (
    <div className="flex gap-1.5 items-center">
      <MdOutlineDocumentScanner className="size-7 text-primary" />
      <p className="text-xl font-bold text-muted-foreground dark:text-foreground">
        Lettera
      </p>
    </div>
  );
}
