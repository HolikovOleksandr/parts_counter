import { Repository } from '../utils/resources/Repository.js';

export const showDetailsAmountHandler = async (ctx) => {
  const detailsData = await Repository.showDetailsAmoint(ctx.from.id);

  const formattedMessage = Object.entries(detailsData)
    .map(([key, value]) => `${key}: <b>${value}</b>`)
    .join('\n');

  await ctx.reply(formattedMessage, { parse_mode: 'HTML' });
};
