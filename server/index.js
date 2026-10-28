import express from 'express';
import bot from './bot.js';

const app = express();
const PORT = process.env.PORT || 3000;

if (!process.env.BOT_TOKEN) {
  console.error('❌ ERROR: La variable de entorno BOT_TOKEN no está definida.');
  console.error('   Por favor configúrala con: set BOT_TOKEN=TU_TOKEN_AQUI');
  process.exit(1);
}

app.use(express.json());
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});
app.post('/telegram/send', async (req, res) => {
  const { text, chatId } = req.body;

  if (!text) return res.status(400).json({ error: 'Texto requerido' });
  if (!chatId) return res.status(400).json({ error: 'chatId requerido' });

  try {
    await bot.api.sendMessage(chatId, text, { parse_mode: "HTML" });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});   
bot.start();

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`🤖 Bot de Telegram iniciado`);
});