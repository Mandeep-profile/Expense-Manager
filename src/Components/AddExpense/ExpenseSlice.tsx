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

const getUserKeys = (email:string) => `userExpenses_${email}`

const initialState: ExpenseState = {
  expensesList: [],
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    loadUserExpenses: (state, action) => {
      const email = action.payload
      const savedItems = localStorage.getItem(getUserKeys(email))
      state.expensesList = savedItems ? JSON.parse(savedItems) : []
    },
    addExpense: (state, action) => {
      const {email, expense} = action.payload
      state.expensesList.push(expense);
      localStorage.setItem(getUserKeys(email), JSON.stringify(state.expensesList))
    },
    deleteExpense: (state, action) => {
      const {email, id} = action.payload
      state.expensesList = state.expensesList.filter(
        (expense) => expense.id !== id,
        localStorage.setItem(getUserKeys(email), JSON.stringify(state.expensesList))
      );
    },
  },
});

export const { loadUserExpenses, addExpense, deleteExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
