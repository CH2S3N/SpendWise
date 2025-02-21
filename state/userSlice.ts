import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  username: string;
  email: string;
  hasData: string;
}

const initialState: UserState = {
  username: "",
  email: "",
  hasData: "",
};

const userSlice = createSlice({
  name: "username",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setUserHasData: (state, action: PayloadAction<string>) => {
      state.hasData = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    clearUsername: (state) => {
      state.username = "";
    },
  },
});

export const { setUsername, setEmail, setUserHasData, clearUsername } = userSlice.actions;
export default userSlice.reducer;
