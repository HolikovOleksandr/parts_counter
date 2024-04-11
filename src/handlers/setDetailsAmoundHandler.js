import { Repository } from '../utils/resources/Repository.js';

export const setDetailsAmoundHandler = async (ctx) => {
  const detailsAmount = +ctx.message.text;
  const detail = ctx.session.detail;

  if (detailsAmount < 0) {
    await ctx.reply(`Ти шо тягаєш запчастини з виробництва?!`);
    return;
  }

  if (detailsAmount === 0) {
    await ctx.reply('Тобто нуль?!! То краще попрацюй, а не втикай у телефон.');
    return;
  }

  const congratMem =
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExczg0YW53Y3ZrY3NidXRqOHBoeHlmeWF5aHY3cnZydXVxZm5hOXR5dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5fHTkXB7EOjTV7u8M6/giphy.gif';

  await Repository.addDetailsToDb(ctx.from.id, detail, detailsAmount);

  await ctx.replyWithVideo(congratMem, {
    caption: `Йоой!!! ${detailsAmount}!? Гарна робота!`,
  });
};
