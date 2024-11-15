import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import dbReducer from "./db/dbSlice";
import dataReducer from "./dataSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        db: dbReducer,
        data: dataReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;