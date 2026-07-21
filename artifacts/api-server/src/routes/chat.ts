import { Router, type Request, type Response } from "express";
import Anthropic from "@anthropic-ai/sdk";

const router: Router = Router();

router.post("/chat", async (req: Request, res: Response) => {
  const apiKey = process.env["ANTHROPIC_API_KEY"];
  if (!apiKey) {
    res.status(500).json({ error: "ANTHROPIC_API_KEY is not configured on the server." });
    return;
  }

  const { messages, context } = req.body as {
    messages: { role: "user" | "assistant"; content: string }[];
    context: {
      sites: unknown[];
      waterInfrastructure: unknown[];
      dataCenters: unknown[];
      selectedProject: Record<string, unknown> | null;
    };
  };

  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: "messages array is required." });
    return;
  }

  const anthropic = new Anthropic({ apiKey });

  const ctx = context ?? { sites: [], waterInfrastructure: [], dataCenters: [], selectedProject: null };

  const dataBlock = [
    `CANDIDATE SITES (${ctx.sites.length} sites):\n${JSON.stringify(ctx.sites, null, 2)}`,
    `WATER INFRASTRUCTURE (${ctx.waterInfrastructure.length} items):\n${JSON.stringify(ctx.waterInfrastructure, null, 2)}`,
    `DATA CENTERS (${ctx.dataCenters.length} items):\n${JSON.stringify(ctx.dataCenters, null, 2)}`,
    ctx.selectedProject
      ? `CURRENT PROJECT:\n${JSON.stringify(ctx.selectedProject, null, 2)}`
      : "No project currently selected.",
  ].join("\n\n");

  const system =
    "You are a water infrastructure and data center site-selection assistant for Saudi Arabia. " +
    "You have access to the following data:\n\n" +
    dataBlock +
    "\n\n" +
    "Rules:\n" +
    "- Answer questions using this data. Cite specific numbers, site names, scores, and capacities where relevant.\n" +
    "- If asked to compare sites, produce a clear structured comparison (use a markdown table if it helps).\n" +
    "- If the user asks something outside the provided data, say so honestly — do not invent numbers.\n" +
    "- When referencing water infrastructure or data centers, use the exact names from the data.\n" +
    "- Keep answers concise and professional. Use markdown formatting — bullet lists, bold, and tables — where it improves clarity.";

  // Log system prompt size for monitoring
  const systemKB = (system.length / 1024).toFixed(1);
  console.log(`[chat] system prompt: ${systemKB} KB | sites: ${ctx.sites.length} | messages: ${messages.length}`);

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
