'use client'

import React, {useState} from 'react';
import { observer } from 'mobx-react-lite';
import { expenseStore } from '../../stores/ExpenseStore';
import { Category, categoryDetails } from '../../stores/categories';
// import './Filter.module.scss';

const Filter: React.FC = observer(() => {
  const [currentCategory, setCurrentCategory] = useState(expenseStore.selectedCategory)
  const [startDate, setStartDate] = useState(expenseStore.startDate)
  const [endDate, setEndDate] = useState(expenseStore.endDate)
  const [sortOrder, setSortOrder] = useState(expenseStore.sortOrder)

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Category | '';
    expenseStore.setCategoryFilter(value || null);
    setCurrentCategory(value || null);
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    expenseStore.setStartDate(e.target.value || null);
    setStartDate(e.target.value || null);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    expenseStore.setEndDate(e.target.value || null);
    setEndDate(e.target.value || null);
  };

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    expenseStore.setSortOrder(e.target.value as 'asc' | 'desc');
    setSortOrder(e.target.value as 'asc' | 'desc')
  };

  return (
    <div className="filter">
      <div className="filter-group">
        <label>Sort by category</label>
        <select value={currentCategory} onChange={handleCategoryChange}>
          <option value="">Все категории</option>
          {Object.values(Category).map((category) => (
            <option key={category} value={category}>
              {categoryDetails[category].label}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Start date</label>
        <input value={startDate} type="date" onChange={handleStartDateChange} />
      </div>

      <div className="filter-group">
        <label>End date</label>
        <input value={endDate} type="date" onChange={handleEndDateChange} />
      </div>

      <div className="filter-group">
        <label>Sort by sum</label>
        <select onChange={handleSortOrderChange} value={sortOrder}>
          <option value="asc">От меньшей к большей</option>
          <option value="desc">От большей к меньшей</option>
        </select>
      </div>
    </div>
  );
});

export default Filter;
