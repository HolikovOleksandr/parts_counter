import { Keyboard } from 'grammy';

export const writeDetailsToDatabase = new Keyboard()
  .text('Додємо деталі до інших')
  .oneTime()
  .resized();
