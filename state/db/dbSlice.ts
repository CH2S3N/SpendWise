import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DbState {
    isDbLoaded: boolean;
    loadingError: string | null;
}

const initialState: DbState ={
    isDbLoaded: false,
    loadingError: null,
};
const dbSlice = createSlice({
    name: "db",
    initialState,
    reducers: {
        setDbLoaded(state) {
            state.isDbLoaded = true;
            state.loadingError = null;
        },
        setDbLoadedError(state, action: PayloadAction<string>) {
            state.loadingError = action.payload;
            state.isDbLoaded = false;
        }
    },
});

export const { setDbLoaded, setDbLoadedError } = dbSlice.actions;

export default dbSlice.reducer;