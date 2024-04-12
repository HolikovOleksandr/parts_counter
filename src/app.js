import { Bot, session } from 'grammy';

import {
  showAllDetailsHandler,
  unexistEmployeeHandler,
  registerEmployeeHandler,
  getDetailsAmoundHandler,
  setDetailsAmoundHandler,
  unexpectCommandHandler,
  showDetailsAmountHandler,
} from './handlers/index.js';

import { Repository } from './utils/resources/Repository.js';
import { myCommands } from './utils/commands/myCommands.js';
import { errorHandler } from './utils/errorhandling/errorHandler.js';

import dotenv from 'dotenv';
dotenv.config();

const bot = new Bot(process.env.BOT_TOKEN);
await bot.api.setMyCommands(myCommands);

const initial = () => {
  return { detail: '' };
};
bot.use(session({ initial }));

bot.command('start', async (ctx) => {
  const isEmployeeExist = await Repository.findEmployeeById(ctx.from.id);

  !!isEmployeeExist
    ? await showAllDetailsHandler(ctx)
    : await unexistEmployeeHandler(ctx);
});

bot.command('details', async (ctx) => {
  await showAllDetailsHandler(ctx);
});

bot.command('amount', async (ctx) => {
  await showDetailsAmountHandler(ctx);
});

bot.on(':contact', async (ctx) => {
  await registerEmployeeHandler(ctx);
});

bot.on('callback_query:data', async (ctx) => {
  await getDetailsAmoundHandler(ctx);
});

bot.on(':text', async (ctx) => {
  !isNaN(ctx.message.text)
    ? await setDetailsAmoundHandler(ctx)
    : await unexpectCommandHandler(ctx);
});

bot.catch((err) => errorHandler(err));
bot.start();
