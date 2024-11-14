import { faker } from "@faker-js/faker";
import { Expense } from "./ExpenseStore";
import { Category } from "./categories";

export async function generateMockExpenses(count: number): Promise<Expense[]> {
  const expenses: Expense[] = [];

  for (let i = 0; i < count; i++) {
    const randomCategory = getRandomCategory();

    expenses.push({
      id: faker.date.past().getTime(),
      name: faker.commerce.productName(),
      description: faker.commerce.department(),
      amount: parseFloat(faker.commerce.price(10, 1000)),
      category: randomCategory,
      date: faker.date.past().toISOString()
    });
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return expenses;
}

function getRandomCategory(): Category {
  const categories = Object.values(Category);
  const randomIndex = Math.floor(Math.random() * categories.length);
  return categories[randomIndex];
}
