import { choiceDetail } from '../utils/keyboards/index.js';

export const showAllDetailsHandler = async (ctx) => {
  await ctx.reply(`Вітаю, ${ctx.from.first_name}! Обирай деталь:`, {
    reply_markup: await choiceDetail(),
  });
};
