'use client'
import React from "react";
import { Expense } from "../../stores/ExpenseStore";
import styles from './ExpenseItem.module.scss'
import { categoryDetails } from "../../stores/categories";

type ExpenseItemProps = {
  expense: Expense;
};

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense }) => {
  const { color, label } = categoryDetails[expense.category]

  return (
    <div className={styles.expenseItem} style={{ backgroundColor: color }}>
      <h3>{expense.name}</h3>
      <p>Amount: {expense.amount.toFixed(2)} руб.</p>
      <p>Category: {expense.category}</p>
      <p>Date: {new Date(expense.id).toLocaleDateString()}</p>
    </div>
  );
};

export default ExpenseItem;
