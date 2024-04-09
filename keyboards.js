import { Keyboard, InlineKeyboard } from "grammy";

export class Keyboards {
  constructor() {
    this.sendContact = new Keyboard();
  }

  sendContactKeyboard = () => {
    return this.sendContact.requestContact("Реестрація").oneTime().resized();
  };

  choiseDetailKeyboard = async (parts) => {
    const buttons = await parts.map((data, index) => [
      InlineKeyboard.text(data, index),
    ]);

    return InlineKeyboard.from(buttons);
  };
}
