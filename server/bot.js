import { Bot, InlineKeyboard } from "grammy";
let screaming = false;

const bot = new Bot(process.env.BOT_TOKEN);
export const sseClients = new Map();

bot.command("start", async (ctx) => {
  await ctx.reply(
    "👋 ¡Hola! Bienvenido al bot.\n\n" +
      "Comandos disponibles:\n" +
      "/scream - Activar modo grito (mayúsculas)\n" +
      "/whisper - Desactivar modo grito\n" +
      "/menu - Mostrar menú interactivo\n\n" +
      `🆔 Tu chat_id: ${ctx.chat.id}`,
  );
});

bot.command("scream", () => {
  screaming = true;
});

bot.command("whisper", () => {
  screaming = false;
});

bot.command("menu", async (ctx) => {
  await ctx.reply("<b>Menu 1</b>", { parse_mode: "HTML" });
});

bot.on("message", (ctx) => {
  const msgText = ctx.message.text || "(sticker, media, etc.)";
  console.log(`${ctx.from?.first_name} escribió: ${msgText}`);

  if (screaming && ctx.message.text) {
    ctx.reply(ctx.message.text.toUpperCase(), {
      entities: ctx.message.entities,
    });
  } else {
    ctx.copyMessage(ctx.message.chat.id);
  }
});

bot.on("callback_query:data", async (ctx) => {
  const callbackData = ctx.callbackQuery.data;

  console.log("CALLBACK DATA COMPLETO:", callbackData);

  const [type, action, requestId] = callbackData.split(":");

  if (type !== "news") return;
  if (action !== "accept" && action !== "reject") return;

  const decision = action === "accept" ? "accepted" : "rejected";

  publishDecision(requestId, decision);

  await ctx.answerCallbackQuery({
    text: "Decisión registrada",
  });
});

function publishDecision(requestId, decision) {
  const clients = sseClients.get(requestId);

  // console.log("Publicando decisión:", {
  //   requestId,
  //   decision,
  //   clients: clients?.size ?? 0,
  // });

  if (!clients) return;

  const payload = JSON.stringify({ decision });

  for (const client of clients) {
    client.write(`event: decision\ndata: ${payload}\n\n`);
  }
}

export default bot;