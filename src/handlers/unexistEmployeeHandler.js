import { registration } from '../utils/keyboards/index.js';

export const unexistEmployeeHandler = async (ctx) => {
  await ctx.reply('Тебе не немає у базі. Давай зарееструємо?', {
    reply_markup: registration,
  });
};
