import express from 'express';
import bot from './bot.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.post('/telegram/send', async (req, res) => {
  const { text, chatId } = req.body;
  
  if (!text) {
    return res.status(400).json({ error: 'Texto requerido' });
  }
  
  let chatIdToUse = chatId || 'me';
  
  try {
    await bot.api.sendMessage(chatIdToUse, text, {
      parse_mode: "HTML"
    });
    res.json({ success: true, message: 'Mensaje enviado', chatId: chatIdToUse });
  } catch (error) {
    if (chatIdToUse === 'me') {
      res.status(400).json({ 
        error: 'chat not found',
        instruction: 'Primero envía "/start" al bot por Telegram para guardar tu chat ID',
        suggestion: 'Usa chatId específico: {"text": "hola", "chatId": "TU_NUMERO_AQUI"}'
      });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

bot.start();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});