import { Router, type Request, type Response } from "express";
import multer from "multer";
import Anthropic from "@anthropic-ai/sdk";

// pdf-parse is externalized in build.mjs; globalThis.require is injected by the build banner.
// Using dynamic require so TypeScript doesn't complain about missing default export.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { PDFParse } = (globalThis as any).require("pdf-parse") as { PDFParse: new () => { parse(buf: Buffer): Promise<{ text: string }> } };

const router: Router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 20 * 1024 * 1024 } });

const SYSTEM_PROMPT = `You are a document analysis assistant specialising in water infrastructure, 
data center siting, and Saudi Arabian regulatory documents. 
Analyse the provided document text and respond with ONLY valid JSON — no markdown, no code fences, no explanation.
The JSON must have exactly these fields:
{
  "summary": "2-3 sentence summary of the document",
  "keyNumbers": ["array of important numbers/figures/budgets/percentages found"],
  "agenciesMentioned": ["array of organisation/agency names"],
  "locationsMentioned": ["array of place names, regions, or project locations"],
  "datesMentioned": ["array of dates or time periods"],
  "waterCapacities": ["array of water capacity figures e.g. m3/day, m3/year, MGD"],
  "suggestedTags": ["3 to 5 short descriptive tags for this document"]
}
If a field has no data, return an empty array. Return ONLY the JSON object, nothing else.`;

router.post(
  "/documents/analyze",
  upload.single("pdf"),
  async (req: Request, res: Response) => {
    const apiKey = process.env["ANTHROPIC_API_KEY"];
    if (!apiKey) {
      res.status(500).json({ error: "ANTHROPIC_API_KEY is not configured on the server." });
      return;
    }

    const file = (req as Request & { file?: Express.Multer.File }).file;
    if (!file) {
      res.status(400).json({ error: "No PDF file received." });
      return;
    }

    // ── Extract text from PDF ─────────────────────────────────────────
    let extractedText: string;
    try {
      const parsed = await pdfParse(file.buffer);
      extractedText = parsed.text ?? "";
    } catch (err) {
      const msg = err instanceof Error ? err.message : "PDF parse failed";
      res.status(422).json({ error: `Could not extract text from PDF: ${msg}` });
      return;
    }

    if (!extractedText.trim()) {
      res.status(422).json({ error: "PDF appears to contain no extractable text (it may be scanned/image-only)." });
      return;
    }

    // Truncate to ~80k chars to stay within context limits
    const docText = extractedText.slice(0, 80_000);

    // ── Call Anthropic ────────────────────────────────────────────────
    const anthropic = new Anthropic({ apiKey });

    let raw: string;
    try {
      const response = await anthropic.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 2048,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: `Analyse this document:\n\n${docText}`,
          },
        ],
      });
      const block = response.content[0];
      raw = block.type === "text" ? block.text : "";
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Anthropic API error";
      res.status(502).json({ error: `AI analysis failed: ${msg}` });
      return;
    }

    // ── Parse JSON (strip markdown fences if present) ─────────────────
    const cleaned = raw
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    let analysis: Record<string, unknown>;
    try {
      analysis = JSON.parse(cleaned);
    } catch {
      res.status(502).json({
        error: "AI returned non-JSON response.",
        raw: cleaned.slice(0, 500),
      });
      return;
    }

    res.json({
      filename: file.originalname,
      size: file.size,
      analysis,
    });
  }
);

export default router;
