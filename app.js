import { Bot } from "grammy";
import { Repository as rps } from "./repository.js";
import dotenv from "dotenv";
import { Keyboards } from "./keyboards.js";
dotenv.config();

const bot = new Bot("7188468982:AAHub6Hz4XkionPQ7CW3VWyKbm-akz_505A");

bot.api.setMyCommands([
  { command: "start", description: "Почати роботу бота" },
  { command: "details", description: "Обрати деталь" },
  { command: "show_all", description: "Список працівників" },
]);

bot.command("start", async (ctx) => {
  const kb = new Keyboards();

  const currentId = ctx.from.id;
  const existEmployee = await rps.findEmployeeById(currentId);

  if (!existEmployee) {
    const answer = "Привіт, спочатку давай зарееструєм тебе";
    await ctx.reply(answer, { reply_markup: kb.sendContactKeyboard() });
  } else {
    const parts = await rps.getPartsArray();
    const partsKeyboard = await kb.choiseDetailKeyboard(parts);
    const answer = `З поверненням, ${existEmployee.Name}! Обирай деталь:`;

    await ctx.reply(answer, { reply_markup: partsKeyboard });
  }
});

bot.on([":contact", "msg:details"], async (ctx) => {
  const kb = new Keyboards();
  const parts = await rps.getPartsArray();
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
    const answer = `Вітаю у лічільнику виготевлених деталей, ${employeeData.Name}! Обирай деталь:`;
    await ctx.reply(answer, { reply_markup: partsKeyboard });
  }
});

// bot.command('details', async (ctx) => {
//   const kb = new Keyboards();
//   const parts = await rps.getPartsArray();
//   const partsKeyboard = await kb.choiseDetailKeyboard(parts);

//   const answer = Привіт! Обирай деталь:;
//   await ctx.reply(answer, { reply_markup: partsKeyboard });
// });

bot.callbackQuery(["1", "2", "3", "4", "5"], async (ctx) => {
  await ctx.answerCallbackQuery();
  const currentPart = "Part Three";
  const answer = `Як багато <b>${currentPart}</b> тобою виготовлено цього разу?`;

  await ctx.reply(answer, {
    parse_mode: "HTML",
  });
});

bot.on(":text", async (ctx) => await ctx.reply("Невідома мені команда :("));
bot.start();
