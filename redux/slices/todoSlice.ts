import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import Todo from "../../model/Todo";

const initialState: Todo[] = [];

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Todo>) => [...state, action.payload],
    remove: (state, action: PayloadAction<string>) => 
      state.filter(todo => todo.id !== action.payload),
    done: (state, action: PayloadAction<string>) => 
      state.map(todo => todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo),
    edit: (state, action: PayloadAction<EditTodoPayload>) => 
      state.map(todo => todo.id === action.payload.id ? action.payload.todo : todo),
    setTodos: (state, action: PayloadAction<Todo[]>) => 
      [...action.payload],
  },
});

export const { add, remove, done, edit, setTodos } = todoSlice.actions;
export const selectTodos = (state: RootState) => state.todo;
export type EditTodoPayload = {
  id: string;
  todo: Todo;
}
export default todoSlice.reducer;


 