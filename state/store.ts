import { configureStore } from "@reduxjs/toolkit";
import dbReducer from "./db/dbSlice";
import dataReducer from "./dataSlice";

export const store = configureStore({
    reducer: {
        db: dbReducer,
        data: dataReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;