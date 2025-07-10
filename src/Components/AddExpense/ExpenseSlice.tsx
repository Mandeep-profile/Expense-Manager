import { createSlice } from "@reduxjs/toolkit";

export interface ExpenseItem {
  id: number;
  name: string;
  amount: number;
  category: string;
  date: string;
}

interface ExpenseState {
  expensesList: ExpenseItem[];
}

const savedItems = localStorage.getItem("userExpenses");
const parsedItems: ExpenseItem[] = savedItems ? JSON.parse(savedItems) : [];

const initialState: ExpenseState = {
  expensesList: parsedItems,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.expensesList.push(action.payload);
    },
    deleteExpense: (state, action) => {
      state.expensesList = state.expensesList.filter(
        (expense) => expense.id !== action.payload
      );
    },
  },
});

export const { addExpense, deleteExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
