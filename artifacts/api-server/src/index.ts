import app from "./app";
import { logger } from "./lib/logger";

const rawPort = process.env["PORT"];

// PORT is injected by the platform (pid1 in production, workflow manager in dev).
// Fall back to 8080 so a missing injection doesn't crash before any logs appear.
const port = rawPort ? Number(rawPort) : 8080;

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
});
