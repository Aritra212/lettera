import mammoth from "mammoth";
import { parsePDF } from "./parsePdf";

export async function parseResumeFile(file: File): Promise<string> {
  const fileType = file.type;

  if (fileType === "application/pdf") {
    const pdfText = await parsePDF(file);
    return pdfText;
  }

  if (
    fileType ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const docxText = await parseDOCX(file);
    return docxText;
  }

  throw new Error("Unsupported file type");
}

async function parseDOCX(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value.trim();
}
