// src/state/data/dataSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, Transaction, Goal, User, Income } from "@/types";

interface DataState {
  categories: Category[];
  transactions: Transaction[];
  user: User[];
  goals: Goal[];
  incomes: Income[];
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  categories: [],
  transactions: [],
  user: [],
  goals: [],
  incomes: [],
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setLoading(state) {
      state.loading = true;
    },
    setData(
      state,
      action: PayloadAction<{ categories: Category[], transactions: Transaction[], user: User[], goals: Goal[], incomes: Income[] }>
    ) {
      state.categories = action.payload.categories || [];
      state.transactions = action.payload.transactions || [];
      state.user = action.payload.user || [];
      state.goals = action.payload.goals || [];
      state.incomes = action.payload.incomes || [];
      state.loading = false;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    clearData(state) {
      state.categories = [];
      state.transactions = [];
      state.goals = [];
      state.user = [];
      state.incomes = [];
    },
  },
});

export const { setLoading, setData, setError, clearData } = dataSlice.actions;
export default dataSlice.reducer;
