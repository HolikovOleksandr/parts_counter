import { Keyboard, InlineKeyboard } from "grammy";

export class Keyboards {
  constructor() {
    this.sendContact = new Keyboard();
    this.setParts = new Keyboard();
    this.writeToDb = new Keyboard();
  }

  sendContactKeyboard = () => {
    return this.sendContact.requestContact("Реестрація").oneTime().resized();
  };

  setPartsKeyboard = () => {
    return this.setParts
      .text("Додати деталі")
      .placeholder("Пиши тут циферку...")
      .oneTime()
      .resized();
  };

  writeToDbKeyboard = () => {
    return this.writeToDb
      .text("Додати до інших")
      .placeholder("Незалежно від результату пишаюся тобою :)")
      .oneTime()
      .resized();
  };

  choiseDetailKeyboard = async (parts) => {
    const buttons = await parts.map((data) => [
      InlineKeyboard.text(data, data),
    ]);

    return InlineKeyboard.from(buttons);
  };
}
