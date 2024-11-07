import { faker } from "@faker-js/faker";
import { Expense } from "./ExpenseStore";
import {Category} from "./categories";

export function generateMockExpenses(count: number): Expense[] {
  const expenses: Expense[] = [];

  for (let i = 0; i < count; i++) {
    const randomCategory = getRandomCategory();

    expenses.push({
      id: faker.date.past().toISOString(),
      name: faker.commerce.productName(),
      amount: parseFloat(faker.commerce.price(10, 1000)),
      category: randomCategory,
      date: faker.date.past().toISOString()
    });
  }

  return expenses;
}

function getRandomCategory(): Category {
  const categories = Object.values(Category);
  const randomIndex = Math.floor(Math.random() * categories.length);
  return categories[randomIndex];
}
