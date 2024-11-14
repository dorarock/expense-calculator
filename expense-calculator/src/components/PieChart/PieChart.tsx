'use client'
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { observer } from 'mobx-react-lite';
import { expenseStore } from '../../stores/ExpenseStore';
import { categoryDetails } from '../../stores/categories';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart: React.FC = observer(() => {
  const data = expenseStore.expenseCategoryData;
  const categories = Object.keys(data);
  const values = Object.values(data);

  const chartData = {
    labels: categories.map((category) => categoryDetails[category]?.label || category),
    datasets: [
      {
        data: values,
        backgroundColor: categories.map((category) => categoryDetails[category]?.color || '#ccc'),
        hoverBackgroundColor: categories.map((category) => categoryDetails[category]?.color || '#aaa'),
      },
    ],
  };

  return (
    <div style={{ width: '400px', height: '100vh', margin: '0 auto' }}>
      <Pie data={chartData} />
    </div>
  );
});

export default PieChart;
