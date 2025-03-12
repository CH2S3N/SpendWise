
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, Transaction, Goal, User, Income, VarDataState } from "@/types";

interface DataState {
  categories: Category[];
  transactions: Transaction[];
  user: User[];
  goals: Goal[];
  incomes: Income[];
  varDataStates: VarDataState[];
  loading: boolean;
  budgetStratSplit: boolean;
  viewed: boolean;
  error: string | null;
}

const initialState: DataState = {
  categories: [],
  transactions: [],
  varDataStates: [],
  user: [],
  goals: [],
  incomes: [],
  loading: false,
  error: null,
  budgetStratSplit: false,
  viewed: false,
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
      action: PayloadAction<{ categories: Category[], transactions: Transaction[], user: User[], goals: Goal[], incomes: Income[], varDataStates: VarDataState[] }>
    ) {
      state.categories = action.payload.categories || [];
      state.transactions = action.payload.transactions || [];
      state.user = action.payload.user || [];
      state.varDataStates = action.payload.varDataStates || [];
      state.goals = action.payload.goals || [];
      state.incomes = action.payload.incomes || [];
      state.loading = false;
      
    },
    setBudgetStratSplit: (state, action: PayloadAction<boolean>) => {
      state.budgetStratSplit = action.payload;
    },
    setViewedOnboarding: (state, action: PayloadAction<boolean>) => {
      state.viewed = action.payload;
    },

    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    clearData(state) {
      state.transactions = [];
      state.goals = [];
      state.user = [];
      state.incomes = [];
    },
  },
});

export const { setLoading, setData, setError, clearData, setBudgetStratSplit, setViewedOnboarding  } = dataSlice.actions;
export default dataSlice.reducer;
