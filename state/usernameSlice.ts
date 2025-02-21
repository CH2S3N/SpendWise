import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UsernameState {
  username: string;
  email: string;
}

const initialState: UsernameState = {
  username: "",
  email: "",
};

const usernameSlice = createSlice({
  name: "username",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    clearUsername: (state) => {
      state.username = "";
    },
  },
});

export const { setUsername, setEmail, clearUsername } = usernameSlice.actions;
export default usernameSlice.reducer;
