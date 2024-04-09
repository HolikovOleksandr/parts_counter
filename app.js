import { Bot, Keyboard } from "grammy";
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
  const setPartsKeyboard = kb.setPartsKeyboard();
  await ctx.answerCallbackQuery();

  currentPart = ctx.callbackQuery.data;
  const answer = `Як багато <b>${currentPart}</b> тобою виготовлено?`;

  await ctx.reply(answer, {
    // reply_markup: setPartsKeyboard,
    parse_mode: "HTML",
  });
});

// Write to db
bot.hears("1", async (ctx) => {
  const writeToDbKeyboard = kb.writeToDbKeyboard();

  //TODO: Write 0 and <0 logic
  currentAmount = +ctx.message.text;

  const answer = `Додаємо ${currentAmount} ${currentPart} до інших?`;

  await ctx.reply(answer, {
    reply_markup: writeToDbKeyboard,
  });
});

bot.hears("Додати до інших", async (ctx) => {
  const congratMem =
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExczg0YW53Y3ZrY3NidXRqOHBoeHlmeWF5aHY3cnZydXVxZm5hOXR5dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5fHTkXB7EOjTV7u8M6/giphy.gif";
  const answer = "Гарна робота! Ти непогано підзаробив сьогодні :)";

  await rps.addParts();

  await ctx.replyWithVideo(congratMem, {
    description: answer,
  });
});

bot.on(":text", async (ctx) => await ctx.reply("Невідома мені команда :("));
bot.start();
