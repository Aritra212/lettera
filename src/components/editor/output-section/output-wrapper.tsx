"use client";

import RichTextEditor from "@/components/common/rich-teaxt-editor";
import { Button } from "@/components/ui/button";
import ButtonTooltip from "@/components/ui/custom/button-tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, Info, PenLine, Sparkles, Loader2, FileText, Copy } from "lucide-react";
import { useState } from "react";
import { FaRegFilePdf } from "react-icons/fa6";
import { useTransientStore } from "@/stores/useTransientStore";
import { getProviderByName } from "@/lib/getProvider";
import { toast } from "sonner";
import { jsPDF } from "jspdf";
import htmlDocx from "html-docx-js/dist/html-docx";

export default function OutputWrapper() {
  const [editText, setEditText] = useState(false);
  const [editedContent, setEditedContent] = useState<string>("");
  const {
    generatedContent,
    generationMetadata,
    isGenerating,
    generationError,
  } = useTransientStore();

  const displayContent = editedContent || generatedContent;

  // Export to PDF
  const handleExportPDF = () => {
    if (!displayContent) {
      toast.error("No content to export");
      return;
    }

    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const maxWidth = pageWidth - 2 * margin;

      // Create a temporary div to parse HTML
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = displayContent;
      const textContent = tempDiv.textContent || tempDiv.innerText || "";

      // Split text into lines
      const lines = doc.splitTextToSize(textContent, maxWidth);
      let y = margin;

      lines.forEach((line: string) => {
        if (y + 10 > pageHeight - margin) {
          doc.addPage();
          y = margin;
        }
        doc.text(line, margin, y);
        y += 7;
      });

      const fileName = `${generationMetadata?.serviceType || "document"}_${new Date().getTime()}.pdf`;
      doc.save(fileName);
      toast.success("PDF exported successfully");
    } catch (error) {
      toast.error("Failed to export PDF");
    }
  };

  // Helper function to clean HTML and remove CSS classes
  const cleanHTMLForExport = (html: string): string => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    // Remove all class attributes and style attributes
    const allElements = tempDiv.querySelectorAll("*");
    allElements.forEach((element) => {
      element.removeAttribute("class");
      element.removeAttribute("style");
    });

    return tempDiv.innerHTML;
  };

  // Export to DOC
  const handleExportDOC = () => {
    if (!displayContent) {
      toast.error("No content to export");
      return;
    }

    try {
      // Clean HTML content by removing all CSS classes and inline styles
      const cleanedContent = cleanHTMLForExport(displayContent);

      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                padding: 20px;
                font-size: 12pt;
              }
              h1, h2, h3 {
                color: #333;
                margin-top: 12pt;
                margin-bottom: 6pt;
              }
              h2 { font-size: 14pt; font-weight: bold; }
              h3 { font-size: 12pt; font-weight: bold; }
              p {
                margin: 6pt 0;
                text-align: justify;
              }
              blockquote {
                border-left: 3px solid #ccc;
                padding-left: 12pt;
                margin-left: 0;
                font-style: italic;
                color: #666;
              }
              ul, ol {
                margin: 6pt 0;
                padding-left: 24pt;
              }
              li {
                margin: 3pt 0;
              }
              code {
                font-family: 'Courier New', monospace;
                background-color: #f5f5f5;
                padding: 2pt 4pt;
                font-size: 11pt;
              }
              pre {
                background-color: #f5f5f5;
                padding: 12pt;
                border-radius: 4pt;
                font-family: 'Courier New', monospace;
                font-size: 11pt;
              }
              strong, b { font-weight: bold; }
              em, i { font-style: italic; }
              u { text-decoration: underline; }
              s { text-decoration: line-through; }
              mark {
                background-color: yellow;
                padding: 0 2pt;
              }
            </style>
          </head>
          <body>
            ${cleanedContent}
          </body>
        </html>
      `;

      const blob = htmlDocx.asBlob(htmlContent);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${generationMetadata?.serviceType || "document"}_${new Date().getTime()}.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success("DOC exported successfully");
    } catch (error) {
      toast.error("Failed to export DOC");
    }
  };

  // Copy to clipboard
  const handleCopyText = async () => {
    if (!displayContent) {
      toast.error("No content to copy");
      return;
    }

    try {
      // Create a temporary div to parse HTML and preserve formatting
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = displayContent;
      const textContent = tempDiv.textContent || tempDiv.innerText || "";

      await navigator.clipboard.writeText(textContent);
      toast.success("Text copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy text");
    }
  };

  const providerLabel = generationMetadata
    ? getProviderByName(generationMetadata.provider)?.label
    : null;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center border-b px-7 h-12 ">
        <div className="flex gap-1 items-center">
          {isGenerating ? (
            <>
              <Loader2 className="text-primary size-5 mr-2 animate-spin" />
              <p>Generating content...</p>
            </>
          ) : generatedContent ? (
            <>
              <Sparkles className="text-primary size-5 mr-2" />
              <p>
                Generated by {providerLabel} - {generationMetadata?.model}
              </p>
            </>
          ) : (
            <>
              <Info className="text-muted-foreground size-5 mr-2" />
              <p>No content generated yet</p>
            </>
          )}
        </div>
        {generatedContent && !isGenerating && (
          <div className="flex gap-4 items-center">
            <ButtonTooltip text="Edit Text">
              <Button
                variant={editText ? "default" : "outline"}
                size={"icon-sm"}
                onClick={() => setEditText((prev) => !prev)}
                className="rounded"
              >
                <PenLine />
              </Button>
            </ButtonTooltip>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size={"icon-sm"} variant={"outline"}>
                  <Download />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-40 rounded-sm ">
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={handleExportPDF}>
                    <FaRegFilePdf /> Export as PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleExportDOC}>
                    <FileText className="size-4" /> Export as DOC
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleCopyText}>
                    <Copy className="size-4" /> Copy Text
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
      <div className="space-y-3">
        {isGenerating ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">
                Generating your content, please wait...
              </p>
            </div>
          </div>
        ) : generationError ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <p className="text-destructive mb-2">Error generating content</p>
              <p className="text-sm text-muted-foreground">{generationError}</p>
            </div>
          </div>
        ) : displayContent ? (
          <RichTextEditor
            content={displayContent}
            readOnly={!editText}
            onValueChange={(value) => setEditedContent(value)}
          />
        ) : (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <Sparkles className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                Fill in the job details and click Generate to create your{" "}
                {generationMetadata?.serviceType === "mail"
                  ? "email"
                  : "cover letter"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
