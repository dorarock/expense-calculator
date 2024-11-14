'use client';
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { observer } from "mobx-react-lite";
import { expenseStore } from "../../stores/ExpenseStore";
import {Category, categoryDetails} from "../../stores/categories";
import style from './AddExpenseForm.module.scss'

type FormValues = {
  name: string;
  amount: number;
  category: Category;
  date: Date;
};

const AddExpenseForm: React.FC = observer(() => {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { name, description, amount, category, date } = data;
    expenseStore.addExpense(name, description, Number(amount), category, date.toISOString());
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="add-expense-form">
      <div>
        <label>Name</label>
        <input {...register("name", { required: true })} placeholder="Название расхода" />
      </div>
      <div>
        <label>Sum</label>
        <input type="number" {...register("amount", { required: true, min: 0.01 })} placeholder="Сумма" />
      </div>
      <div>
        <label>Category</label>
        <select {...register("category", { required: true })}>
          {Object.values(Category).map((category) => (
            <option key={category} value={category}>
              {categoryDetails[category].label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Date</label>
        <input type="date" {...register("date", { required: true })} />
      </div>
      <button type="submit">Add new</button>
    </form>
  );
});

export default AddExpenseForm;
