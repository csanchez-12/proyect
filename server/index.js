import express from 'express';
import bot from './bot';

const app = express();
const PORT = process.env.PORT || 3000;

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start the Telegram bot polling
bot.start();

// Start the HTTP server
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});