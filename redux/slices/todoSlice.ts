import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import Todo from "../../model/Todo";
import Column from "../../model/Column";

type AddPayload = {
  todo: Todo,
  columnId: string
}

type RemovePayload = {
  todoId: string,
  columnId: string
}

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todos: [] as Todo[],
    columns: [] as Column[],
    columnOrder: [] as string[]
  },
  reducers: {
    add: (state, action: PayloadAction<AddPayload>) => { 
      const { todo, columnId } = action.payload
      const column: Column | undefined = state.columns.filter(column => column.id === columnId)[0]
      if (typeof column === "undefined") {
        return
      }
      state.todos.push(todo)
      column.todoIds.push(todo.id)
    },
    remove: (state, action: PayloadAction<RemovePayload>) => {
      const { todoId, columnId } = action.payload
      const column: Column | undefined = state.columns.filter(column => column.id === columnId)[0]
      if (typeof column === "undefined") {
        return
      }
      state.todos = state.todos.filter(todo => todo.id != todoId) 
      column.todoIds = column.todoIds.filter(id => id != todoId)
    },
    done: (state, action: PayloadAction<string>) => 
      { state.todos = state.todos.map(todo => todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo) },      
    edit: (state, action: PayloadAction<EditTodoPayload>) => { 
      state.todos = state.todos.map(todo => todo.id === action.payload.id ? { 
        ...todo, 
        title: action.payload.title, 
        description: action.payload.description 
      } : todo)
    }
  },
});

export const { add, remove, done, edit } = todoSlice.actions;
export const selectTodos = (state: RootState) => state.todo;
export type EditTodoPayload = {
  id: string;
  title: string;
  description: string;
}
export default todoSlice.reducer;
