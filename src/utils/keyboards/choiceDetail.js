import { InlineKeyboard } from 'grammy';
import { Repository } from '../resources/Repository.js';

export const choiceDetail = async () => {
  const details = await Repository.getAllDetails();
  return InlineKeyboard.from(details.map((d) => [InlineKeyboard.text(d, d)]));
};
