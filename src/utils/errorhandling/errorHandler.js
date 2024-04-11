
export const errorHandler = (error) => {
  console.error('::: ERROR ::: ERROR ::: ERROR :::');
  console.error(`Помилка оновлення ${ctx.update.update_id}:`);
  if (err.error instanceof GrammyError) {
    console.error('Помилка в запиті:', err.error.description);
  } else if (err.error instanceof HttpError) {
    console.error('Не вдалося звʼязатися з Telegram:', err.error);
  } else {
    console.error('Невідома помилка:', err.error);
  }
};
