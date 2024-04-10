import { Bot} from "grammy";
import { Repository as rps } from "./repository.js";
import dotenv from "dotenv";
import { Keyboards } from "./keyboards.js";
dotenv.config();

const kb = new Keyboards();

let currentPart = null;
let currentAmount = null;

// Create bot
const bot = new Bot(process.env.BOT_TOKEN);

// Set own commands
bot.api.setMyCommands([
  { command: "start", description: "Почати роботу бота" },
  { command: "details", description: "Обрати деталь" },
]);

// Start
bot.command("start", async (ctx) => {
  const currentId = ctx.from.id;
  const existEmployee = await rps.findEmployeeById(currentId);

  if (!existEmployee) {
    const answer = "Привіт, спочатку давай зарееструєм тебе";
    await ctx.reply(answer, { reply_markup: kb.sendContactKeyboard() });
  } else {
    // Set part from start
    const parts = await rps.getAllParts();
    const partsKeyboard = await kb.choiseDetailKeyboard(parts);
    const answer = `З поверненням, ${existEmployee.Name}! Обирай деталь:`;

    await ctx.reply(answer, { reply_markup: partsKeyboard });
  }
});

// Registration
bot.on(":contact", async (ctx) => {
  const parts = await rps.getAllParts();
  const partsKeyboard = await kb.choiseDetailKeyboard(parts);

  const employeeData = {
    Id: ctx.from.id,
    Name: ctx.update.message.contact.first_name,
    Phone: ctx.update.message.contact.phone_number,
  };

  try {
    const isUserExist = await rps.findEmployeeById(employeeData.Id);
    if (!isUserExist) await rps.postEmployeeData(employeeData);
  } catch (error) {
    console.error(error);
  } finally {
    // Set part after registration
    const answer = `Вітаю у лічільнику виготевлених деталей, ${employeeData.Name}! Обирай деталь:`;
    await ctx.reply(answer, { reply_markup: partsKeyboard });
  }
});

// Set detail from command
bot.command("details", async (ctx) => {
  const parts = await rps.getAllParts();
  const partsKeyboard = await kb.choiseDetailKeyboard(parts);

  const answer = "Привіт! Обирай деталь:";
  await ctx.reply(answer, { reply_markup: partsKeyboard });
});

// Set amount
bot.on("callback_query:data", async (ctx) => {
  // const setPartsKeyboard = kb.setPartsKeyboard();
  await ctx.answerCallbackQuery();

  currentPart = ctx.callbackQuery.data;
  const answer = `Як багато <b>${currentPart}</b> тобою виготовлено?`;

  await ctx.reply(answer, {
    // reply_markup: setPartsKeyboard,
    parse_mode: "HTML",
  });
});

bot.on(":text", async (ctx) => {
  const msg = ctx.message.text;
  const isNumber = /^\d+$/.test(ctx.message.text);

  // Write to db
  if (isNumber) {
    if (msg > 0) {
      currentAmount = +msg;

      const congratMem =
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExczg0YW53Y3ZrY3NidXRqOHBoeHlmeWF5aHY3cnZydXVxZm5hOXR5dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5fHTkXB7EOjTV7u8M6/giphy.gif";
      const answer = `${currentAmount}!? Гарна робота!`;

      await rps.addParts(ctx.from.id, currentPart, currentAmount);

      await ctx.replyWithVideo(congratMem, { caption: answer });
    } else if (msg < 0) {
      await ctx.reply(
        // const minuseDetailsKeyboard = kb.minuseDetailsKeyboard()
        `Ти якщо тягаєш запчастини з виробництва то хочаб не хизувався! Чи відняти ${msg} ${currentPart} від загальної сумми?`
      );
    } else {
      await ctx.reply("0?!! То краще попрацюй, а не втикай у телефон.");
    }
  } else {
    await ctx.reply("Невідома мені команда, подиви щось у синій копці 'Меню'");
  }
});

bot.start();
