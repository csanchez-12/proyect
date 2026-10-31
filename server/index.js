import express from "express";
import bot from "./bot.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.disable("x-powered-by");
app.use(express.json({ limit: "10kb" }));

if (!process.env.BOT_TOKEN) {
  console.error("❌ ERROR: La variable de entorno BOT_TOKEN no está definida.");
  console.error("   Por favor configúrala con: set BOT_TOKEN=TU_TOKEN_AQUI");
  process.exit(1);
}

app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "API funcionando" });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});
app.post("/send/data", async (req, res) => {
  const { text, reply_markup } = req.body;

  if (!text) return res.status(400).json({ error: "Texto requerido" });

  try {
    await bot.api.sendMessage(process.env.CHAT_ID, text, {
      parse_mode: "HTML",
      reply_markup,
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
bot.start();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`Bot de Telegram iniciado`);
});
