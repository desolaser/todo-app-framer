import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../model/User";

type Session = {
  user: User;
  token: string;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {} as Session | null,
  reducers: {
    login: (state: Session | null, action: PayloadAction<Session>) => action.payload,
    logout: (state: Session | null, action: PayloadAction) => null
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
