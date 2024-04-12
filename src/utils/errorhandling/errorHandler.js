import { HttpError, GrammyError } from 'grammy';

export const errorHandler = (err) => {
  const ctx = err.ctx;

  console.error('::: ERROR ::: ERROR ::: ERROR :::');
  console.error(`Помилка під час обробки оновлення ${ctx.update.update_id}:`);

  if (err.error instanceof GrammyError) {
    console.error('Помилка в запиті:', err.error.description);
  } else if (err.error instanceof HttpError) {
    console.error('Не вдалося звʼязатися з Telegram:', err.error);
  } else {
    console.error('Невідома помилка:', err.error);
  }
};
