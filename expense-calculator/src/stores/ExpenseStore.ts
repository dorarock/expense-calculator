import { makeAutoObservable } from "mobx";
import {Category} from "./categories";

// Типы для расходов и категории
export type Expense = {
  id: number;
  description: string;
  amount: number;
  category: Category;
  name: string;
};

export const createExpenseStore = () => {
  const store = makeAutoObservable({
    expenses: [] as Expense[],
    selectedCategory: null as string | null,
    startDate: null as string | null,
    endDate: null as string | null,
    minPrice: null as number | null,
    maxPrice: null as number | null,
    sortOrder: null as string | null,

    addExpense(name, description: string, amount: number, category: string) {
      const newExpense: Expense = {
        id: Date.now(),
        description,
        amount,
        category,
        name
      };
      this.expenses.push(newExpense);
    },

    setExpenses(mockExpenses: Expense[]) {
      this.expenses = mockExpenses;
    },

    sortExpenses(column: 'name' | 'amount' | 'category' | 'date', order: 'asc' | 'desc') {
      this.expenses = this.expenses.slice().sort((a, b) => {
        let comparison = 0;
        if (column === 'amount') {
          comparison = a.amount - b.amount;
        } else if (column === 'date') {
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
        } else {
          comparison = a[column].localeCompare(b[column]);
        }
        return order === 'asc' ? comparison : -comparison;
      });
    },

    get filteredExpenses() {
      return this.expenses; // Фильтрация будет добавлена отдельно, если требуется
    },
  });

  return store;
};

export const expenseStore = createExpenseStore();
