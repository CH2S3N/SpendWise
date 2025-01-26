import { configureStore } from "@reduxjs/toolkit";

import dataReducer from "./dataSlice";
import budgetReducer from "./budgetSlice"
export const store = configureStore({
    reducer: {
        data: dataReducer,
        budget: budgetReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;