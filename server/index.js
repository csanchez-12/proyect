import express from "express";
import bot, { sseClients } from "./bot.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.disable("x-powered-by");
app.use(express.json({ limit: "10kb" }));

if (!process.env.BOT_TOKEN) {
  console.error("BOT_TOKEN no está definido");
  process.exit(1);
}

app.get("/", (req, res) => {
  res.json({ message: "API funcionando" });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.post("/news/request", async (req, res) => {
  const requestId = crypto.randomUUID();

  res.json({
    requestId,
    botUrl: `https://t.me/${process.env.BOT_NAME}?start=${requestId}`,
  });
});

app.get("/news/events/:requestId", (req, res) => {
  const { requestId } = req.params;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");

  res.flushHeaders();

  if (!sseClients.has(requestId)) {
    sseClients.set(requestId, new Set());
  }

  const clients = sseClients.get(requestId);
  clients.add(res);

  res.write("event: connected\ndata: {}\n\n");

  req.on("close", () => {
    clients.delete(res);

    if (clients.size === 0) {
      sseClients.delete(requestId);
    }
  });
});

bot.start();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
