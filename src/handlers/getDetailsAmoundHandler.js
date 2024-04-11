export const getDetailsAmoundHandler = async (ctx) => {
  await ctx.answerCallbackQuery();
  ctx.session.detail = ctx.callbackQuery.data;

  await ctx.reply(`Скільки зроблено <b>${ctx.session.detail}</b>?`, {
    parse_mode: 'HTML',
  });
};
