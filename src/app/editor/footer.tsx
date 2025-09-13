import Link from "next/link";

export default function EditorFooter() {
  return (
    <div className="py-2">
      <p className="text-sm text-center font-medium text-muted-foreground">
        &copy; 2025 developed by -{" "}
        <Link
          href={"https://www.itsaritra.dev"}
          rel="noopener noreferrer"
          target="_blank"
        >
          Aritra Paul
        </Link>
      </p>
    </div>
  );
}
