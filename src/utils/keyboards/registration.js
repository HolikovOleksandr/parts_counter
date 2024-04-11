import { Keyboard } from 'grammy';

export const registration = new Keyboard()
  .requestContact('Зарееструватися')
  .oneTime()
  .resized();
