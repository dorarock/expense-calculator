import { makeAutoObservable } from "mobx";
import {Category} from "./categories";

// Типы для расходов и категории
export type Expense = {
  id: number;
  description: string;
  amount: number;
  category: Category;
  name: string;
  date: string
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
    isModalOpen: false,

    addExpense(name: string, description: string, amount: number, category: Category, date: string) {
      const newExpense: Expense = {
        id: Date.now(),
        description,
        amount,
        category,
        name,
        date
      };
      store.expenses.push(newExpense);
    },

    setExpenses(mockExpenses: Expense[]) {
      store.expenses = mockExpenses;
    },

    sortExpenses(column: 'name' | 'amount' | 'category' | 'date', order: 'asc' | 'desc') {
      store.expenses = store.expenses.slice().sort((a, b) => {
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

    openModal() {
      store.isModalOpen = true;
    },

    closeModal() {
      store.isModalOpen = false;
    },

    get filteredExpenses() {
      return store.expenses;
    },

    get expenseCategoryData() {
      const categoryTotals: Record<string, number> = {};

      store.expenses.forEach((expense) => {
        if (!categoryTotals[expense.category]) {
          categoryTotals[expense.category] = 0;
        }
        categoryTotals[expense.category] += expense.amount;
      });

      return categoryTotals;
    },
  });

  return store;
};

export const expenseStore = createExpenseStore();
