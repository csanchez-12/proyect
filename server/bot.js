import { Bot, InlineKeyboard } from "grammy";
let screaming = false;
const bot = new Bot(process.env.BOT_TOKEN);

// This function handles the /scream command
bot.command("scream", () => {
  screaming = true;
});

// This function handles /whisper command
bot.command("whisper", () => {
  screaming = false;
});

const firstMenu = "<b>Menu 1</b>\n\nA beautiful menu with a shiny inline button.";
const secondMenu = "<b>Menu 2</b>\n\nA better menu with even more shiny inline buttons.";

const nextButton = "Next";
const backButton = "Back";
const tutorialButton = "Tutorial";

const firstMenuMarkup = new InlineKeyboard().text(nextButton, nextButton);

const secondMenuMarkup = new InlineKeyboard()
  .text(backButton, backButton)
  .text(tutorialButton, "https://core.telegram.org/bots/tutorial");

bot.command("menu", async (ctx) => {
  await ctx.reply(firstMenu, {
    parse_mode: "HTML",
    reply_markup: firstMenuMarkup,
  });
});

bot.callbackQuery(backButton, async (ctx) => {
  await ctx.editMessageText(firstMenu, {
    reply_markup: firstMenuMarkup,
    parse_mode: "HTML",
  });
});

bot.callbackQuery(nextButton, async (ctx) => {
  await ctx.editMessageText(secondMenu, {
    reply_markup: secondMenuMarkup,
    parse_mode: "HTML",
  });
});

bot.on("message", async (ctx) => {
  console.log(
    `${ctx.from?.first_name} wrote ${
      "text" in ctx.message ? ctx.message.text : ""
    }`,
  );

  if (screaming && ctx.message.text) {
    await ctx.reply(ctx.message.text.toUpperCase(), {
      entities: ctx.message.entities,
    });
  } else {
    await ctx.copyMessage(ctx.message.chat.id);
  }
});

export default bot;