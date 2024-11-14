'use client'
import React from 'react';
import styles from './AddExpenseBtn.module.scss';
import { expenseStore } from "../../stores/ExpenseStore";
import { observer } from "mobx-react-lite";

const AddExpenseBtn: React.FC = observer(() => {
  return <button className={styles.fixedButton} onClick={() => expenseStore.openModal()}>
    Add new
  </button>
});

export default AddExpenseBtn;
