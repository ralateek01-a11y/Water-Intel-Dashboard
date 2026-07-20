import { Router, type Request, type Response } from "express";
import Anthropic from "@anthropic-ai/sdk";

const router: Router = Router();

router.post("/chat", async (req: Request, res: Response) => {
  const apiKey = process.env["ANTHROPIC_API_KEY"];
  if (!apiKey) {
    res.status(500).json({ error: "ANTHROPIC_API_KEY is not configured on the server." });
    return;
  }

  const { messages, siteData } = req.body as {
    messages: { role: "user" | "assistant"; content: string }[];
    siteData: Record<string, unknown> | null;
  };

  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: "messages array is required." });
    return;
  }

  const anthropic = new Anthropic({ apiKey });

  const siteContext = siteData
    ? `\n\nCurrently selected site data (JSON):\n${JSON.stringify(siteData, null, 2)}`
    : "\n\nNo site is currently selected.";

  const system =
    "You are a water infrastructure and data center site-selection expert for Saudi Arabia. " +
    "Answer questions about the currently selected site using the provided data. " +
    "Be concise and specific, citing exact numbers from the data when relevant. " +
    "When the user asks about scores, approval timelines, water capacity, cooling costs, " +
    "or infrastructure availability, always refer to the actual values in the site JSON." +
    siteContext;

  // SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  try {
    const stream = anthropic.messages.stream({
      model: "claude-sonnet-4-6",
      max_tokens: 8192,
      system,
      messages,
    });

    for await (const event of stream) {
      if (
        event.type === "content_block_delta" &&
        event.delta.type === "text_delta"
      ) {
        res.write(`data: ${JSON.stringify({ content: event.delta.text })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.write(`data: ${JSON.stringify({ error: message })}\n\n`);
    res.end();
  }
});

export default router;
