import { choiceDetail } from '../utils/keyboards/index.js';

export const unexpectCommandHandler = async (ctx) => {
  await ctx.reply('Невідома мені команда. Деталь обрано?', {
    reply_markup: await choiceDetail(),
  });
};
