
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
  userManual: boolean;
  accGoalSwitch: boolean
  welcomed: boolean
  allocation: boolean
  nameSetted: boolean
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
  userManual: false,
  accGoalSwitch: false,
  welcomed: false,
  allocation: false,
  nameSetted: false
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
    setWelcomed: (state, action: PayloadAction<boolean>) => {
      state.welcomed = action.payload;
    },
    setAccGoalSwitch: (state, action: PayloadAction<boolean>) => {
      state.accGoalSwitch = action.payload;
    },
    setViewedOnboarding: (state, action: PayloadAction<boolean>) => {
      state.viewed = action.payload;
    },
    setViewedUserManual: (state, action: PayloadAction<boolean>) => {
      state.userManual = action.payload;
    },
    setHasName: (state, action: PayloadAction<boolean>) => {
      state.nameSetted = action.payload;
    },
    setAllocation: (state) => {
      state.allocation = true
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

export const { setLoading, setData, setError, clearData, setBudgetStratSplit, setViewedOnboarding, setAccGoalSwitch, setWelcomed, setHasName, setAllocation, setViewedUserManual  } = dataSlice.actions;
export default dataSlice.reducer;
