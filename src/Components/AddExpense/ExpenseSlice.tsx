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

const initialState: ExpenseState = {
  expensesList: [],
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    loadUserExpenses: (state, action) => {
      const email = action.payload;
      const storedExpenses = JSON.parse(
        localStorage.getItem(`userExpenses_${email}`) || "[]"
      );
      state.expensesList = storedExpenses;
    },

    addExpense: (state, action) => {
      const { email, expense } = action.payload;
      const stored = JSON.parse(
        localStorage.getItem(`userExpenses_${email}`) || "[]"
      );
      const updatedExpenses = [...stored, expense];

      localStorage.setItem(
        `userExpenses_${email}`,
        JSON.stringify(updatedExpenses)
      );
      state.expensesList = updatedExpenses;
    },

    deleteExpense: (state, action) => {
      const { email, id } = action.payload;
      const stored = JSON.parse(
        localStorage.getItem(`userExpenses_${email}`) || "[]"
      );
      const updatedExpenses = stored.filter((exp) => exp.id !== id);

      localStorage.setItem(
        `userExpenses_${email}`,
        JSON.stringify(updatedExpenses)
      );
      state.expensesList = updatedExpenses;
    },
  },
});

export const { loadUserExpenses, addExpense, deleteExpense } =
  expenseSlice.actions;
export default expenseSlice.reducer;
