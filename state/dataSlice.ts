// src/state/data/dataSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, Transaction, Goal, User } from "@/types"; // Import your types

interface DataState {
  categories: Category[];
  transactions: Transaction[];
  user: User[];
  goal: Goal[];
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  categories: [],
  transactions: [],
  user: [],
  goal: [],
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
      action: PayloadAction<{ categories: Category[], transactions: Transaction[], user: User[], goal: Goal[] }>
    ) {
      state.categories = action.payload.categories;
      state.transactions = action.payload.transactions;
      state.user = action.payload.user;
      state.goal = action.payload.goal;
      state.loading = false;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    clearData(state) {
      state.categories = [];
      state.transactions = [];
      state.goal = [];
      state.user = [];
    },
  },
});

export const { setLoading, setData, setError, clearData } = dataSlice.actions;

export default dataSlice.reducer;
