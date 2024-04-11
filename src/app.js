import { Bot } from 'grammy';
import { Repository } from './utils/resources/repository.js';
import {
  showAllDetailsHandler,
  unexistEmployeeHandler,
  registerEmployeeHandler,
} from './handlers/index.js';
import { myCommands } from './utils/commands/myCommands.js';
import dotenv from 'dotenv';
dotenv.config();

// Create bot
const bot = new Bot(process.env.BOT_TOKEN);
bot.api.setMyCommands(myCommands);

bot.command('start', async (ctx) => {
  const isEmployeeExist = await Repository.findEmployeeById(ctx.from.id);

  !!isEmployeeExist
    ? await showAllDetailsHandler(ctx)
    : await unexistEmployeeHandler(ctx);
});

bot.on(':contact', async (ctx) => registerEmployeeHandler(ctx));

// // Set detail from command
// bot.command('details', async (ctx) => {
//   const parts = await Repository.getAllDetails();
//   const partsKeyboard = await kb.choiseDetailKeyboard(parts);

//   const answer = 'Привіт! Обирай деталь:';
//   await ctx.reply(answer, { reply_markup: partsKeyboard });
// });

// // Set amount
// bot.on('callback_query:data', async (ctx) => {
//   await ctx.answerCallbackQuery();

//   currentPart = ctx.callbackQuery.data;
//   const answer = `Як багато <b>${currentPart}</b> тобою виготовлено?`;

//   await ctx.reply(answer, {
//     parse_mode: 'HTML',
//   });
// });

bot.on(':text', async (ctx) => {
  const msg = ctx.message.text;
  const isNumber = /^\d+$/.test(ctx.message.text);

  // Write to db
  if (isNumber) {
    if (msg > 0) {
      currentAmount = +msg;

      const congratMem =
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExczg0YW53Y3ZrY3NidXRqOHBoeHlmeWF5aHY3cnZydXVxZm5hOXR5dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5fHTkXB7EOjTV7u8M6/giphy.gif';
      const answer = `${currentAmount}!? Гарна робота!`;

      await Repository.addParts(ctx.from.id, currentPart, currentAmount);

      await ctx.replyWithVideo(congratMem, { caption: answer });
    } else if (msg < 0) {
      await ctx.reply(
        // const minuseDetailsKeyboard = kb.minuseDetailsKeyboard()
        `Ти якщо тягаєш запчастини з виробництва то хочаб не хизувався! Чи відняти ${msg} ${currentPart} від загальної сумми?`
      );
    } else {
      await ctx.reply('0?!! То краще попрацюй, а не втикай у телефон.');
    }
  } else {
    await ctx.reply("Невідома мені команда, подиви щось у синій копці 'Меню'");
  }
});

bot.start();

// 1.
// const details = await Repository.getAllDetails();
// Is a separate initialization required in each methods?
