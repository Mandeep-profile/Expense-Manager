import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./Components/AddExpense/ExpenseSlice";

export const store = configureStore({
  reducer: {
    expense: expenseReducer,
  },
});
