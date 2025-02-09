import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface BudgetState {
  needs: number;
  wants: number;
  savings: number;
  housing: number;
  transportation: number;
  groceries: number;
  healthcare: number;
  utilities: number;
  entertainment:number;
  diningOut: number;
  shopping: number;
  travel: number;
  subscription: number;

}

const initialState: BudgetState = {
  needs: 50,
  wants: 30,
  savings: 20,
  housing: 35,
  transportation: 10,
  groceries: 25,
  healthcare: 15,
  utilities: 15,
  entertainment: 40,
  diningOut: 30,
  shopping: 10,
  travel: 10,
  subscription: 10,
  
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
    resetCat: (state) => {
      state.needs = initialState.needs;
      state.wants = initialState.wants;
      state.savings = initialState.savings;
    },

    resetSubCatNeeds: (state) => {
      state.housing = initialState.housing;
      state.transportation = initialState.transportation;
      state.groceries = initialState.groceries;
      state.healthcare = initialState.healthcare;
      state.utilities = initialState.utilities;
    },
    resetSubCatWants: (state) => {
      state.entertainment = initialState.entertainment;
      state.diningOut = initialState.diningOut;
      state.shopping = initialState.shopping;
      state.travel = initialState.travel;
      state.subscription = initialState.subscription;
    },
  },
  
});

export const { setNeeds, setWants, setSavings, setAll, resetCat, resetSubCatNeeds, resetSubCatWants } = budgetSlice.actions;

export default budgetSlice.reducer;
