import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface BudgetState {
  needs: number;
  wants: number;
  savings: number;
}

const initialState: BudgetState = {
  needs: 50,
  wants: 30,
  savings: 20,
};

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    setNeeds: (state, action: PayloadAction<number>) => {
      state.needs = action.payload;
    },
    setWants: (state, action: PayloadAction<number>) => {
      state.wants = action.payload;
    },
    setSavings: (state, action: PayloadAction<number>) => {
      state.savings = action.payload;
    },
    setAll: (state, action: PayloadAction<BudgetState>) => {
      state.needs = action.payload.needs;
      state.wants = action.payload.wants;
      state.savings = action.payload.savings;
    },
  },
});

export const { setNeeds, setWants, setSavings, setAll } = budgetSlice.actions;

export default budgetSlice.reducer;
