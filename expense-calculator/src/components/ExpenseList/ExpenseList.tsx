'use client'
import React, { useEffect, useState }  from "react";
import { observer } from "mobx-react-lite";
import { expenseStore } from "../../stores/ExpenseStore";
import { generateMockExpenses } from "../../stores/mockData";
import styles from './ExpenseList.module.scss';
import PieChart from "../PieChart/PieChart";
import {categoryDetails} from "../../stores/categories";

enum Tabs {
  Chart = "Chart",
  Expenses = "My expenses",
}

type SortColumn = 'name' | 'amount' | 'category' | 'date';
type SortOrder = 'asc' | 'desc';

const ExpenseList: React.FC = observer(() => {
  const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.Expenses);
  const [sortColumn, setSortColumn] = useState<SortColumn>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleTabChange = (tab: Tabs) => {
    setCurrentTab(tab);
  };

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
    expenseStore.sortExpenses(column, sortOrder);
  };

  useEffect( () => {
    generateMockExpenses(10).then((mockExpenses) =>
      expenseStore.setExpenses(mockExpenses)
    )
  }, []);

  return (
    <div>
      <div>
        <button className={styles.tabBtn} onClick={() => handleTabChange(Tabs.Expenses)}>{Tabs.Expenses}</button>
        <button className={styles.tabBtn} onClick={() => handleTabChange(Tabs.Chart)}>{Tabs.Chart}</button>
      </div>
      <h2>{currentTab}</h2>

      {currentTab === Tabs.Chart && <PieChart />}
      {currentTab === Tabs.Expenses &&
      <>
        {expenseStore.filteredExpenses.length > 0 ? (
          <table className={styles.table}>
            <thead>
            <tr>
              <th onClick={() => handleSort('name')}>Название</th>
              <th onClick={() => handleSort('amount')}>Сумма</th>
              <th onClick={() => handleSort('category')}>Категория</th>
              <th onClick={() => handleSort('date')}>Дата</th>
            </tr>
            </thead>
            <tbody>
            {expenseStore.filteredExpenses.map((expense) => {
              const categoryColor = categoryDetails[expense.category]?.color || '#ffffff';
              return (
                <tr key={expense.id} style={{ backgroundColor: categoryColor }}>
                  <td>{expense.name}</td>
                  <td>{expense.amount.toFixed(2)} руб.</td>
                  <td>{expense.category}</td>
                  <td>{new Date(expense.date).toLocaleDateString()}</td>
                </tr>
              );
            })}
            </tbody>
          </table>
        ) : (
          <p>Нет добавленных расходов.</p>
        )}
      </>
      }
    </div>
  );
});

export default ExpenseList;
