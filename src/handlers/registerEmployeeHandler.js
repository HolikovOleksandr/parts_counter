import { Repository } from '../utils/resources/repository.js';
import { choiceDetail } from '../utils/keyboards/index.js';
import { Employee } from '../models/Employee.js';

export const registerEmployeeHandler = async (ctx) => {
  const newEmployee = new Employee();
  newEmployee.id = ctx.from.id;
  newEmployee.name = ctx.update.message.contact.first_name;
  newEmployee.phone = ctx.update.message.contact.phone_number;

  const employee = newEmployee.toObject();
  await Repository.postEmployeeData(employee);

  await ctx.reply(`Вітаю, ${newEmployee.name}! Обирай деталь:`, {
    reply_markup: await choiceDetail(),
  });
};
